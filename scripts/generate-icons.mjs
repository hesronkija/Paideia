/**
 * generate-icons.mjs
 * ------------------
 * Generates Paideia's app icons as PNGs with zero dependencies.
 * Node's built-in zlib does the PNG compression; we build the PNG
 * chunks (IHDR/IDAT/IEND) by hand.
 *
 * Icon design: a white pi (π) glyph on a deep-green rounded square.
 * Run with:  npm run icons
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

const GREEN = [14, 124, 91] // #0e7c5b — theme color
const WHITE = [255, 255, 255]

/* ---------- tiny CRC32 (PNG chunk checksums) ---------- */
const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(bytes) {
  let c = 0xffffffff
  for (const b of bytes) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])))
  return Buffer.concat([len, typeBytes, data, crc])
}

/** Encode a width×height RGBA buffer as a PNG file. */
function writePng(path, width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0 // filter type 0 (none)
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type: RGBA
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // signature
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
  writeFileSync(path, png)
  console.log('wrote', path, `${(png.length / 1024).toFixed(1)} KB`)
}

/**
 * Draw the icon into an RGBA buffer.
 * `glyphScale` shrinks the pi for the maskable icon (safe zone).
 */
function drawIcon(size, glyphScale = 1) {
  const buf = Buffer.alloc(size * size * 4)
  const radius = size * 0.22
  const cx = size / 2
  const cy = size / 2

  // Rounded-square background.
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = Math.min(x, size - 1 - x)
      const dy = Math.min(y, size - 1 - y)
      // inside if within the rounded rect
      const inside =
        dx >= 0 && dy >= 0 &&
        (dx >= radius || dy >= radius ||
          (dx - radius) ** 2 + (dy - radius) ** 2 <= radius ** 2)
      const i = (y * size + x) * 4
      if (inside) {
        buf[i] = GREEN[0]; buf[i + 1] = GREEN[1]; buf[i + 2] = GREEN[2]; buf[i + 3] = 255
      } else {
        buf[i + 3] = 0 // transparent corners
      }
    }
  }

  // White pi: one top bar + two legs, drawn as filled rects.
  const s = size * glyphScale
  const bar = { x: cx - s * 0.26, y: cy - s * 0.22, w: s * 0.52, h: s * 0.09 }
  const legL = { x: cx - s * 0.20, y: cy - s * 0.22, w: s * 0.09, h: s * 0.44 }
  const legR = { x: cx + s * 0.11, y: cy - s * 0.22, w: s * 0.09, h: s * 0.44 }
  for (const r of [bar, legL, legR]) {
    for (let y = Math.max(0, Math.floor(r.y)); y < Math.min(size, Math.ceil(r.y + r.h)); y++) {
      for (let x = Math.max(0, Math.floor(r.x)); x < Math.min(size, Math.ceil(r.x + r.w)); x++) {
        const i = (y * size + x) * 4
        buf[i] = WHITE[0]; buf[i + 1] = WHITE[1]; buf[i + 2] = WHITE[2]; buf[i + 3] = 255
      }
    }
  }
  return buf
}

// Also write a matching SVG source icon (used as favicon + manifest "any").
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect x="4" y="4" width="504" height="504" rx="112" fill="#0e7c5b"/>
  <g fill="#ffffff">
    <rect x="122" y="143" width="268" height="46"/>
    <rect x="154" y="143" width="46" height="226"/>
    <rect x="312" y="143" width="46" height="226"/>
  </g>
</svg>
`
writeFileSync(join(outDir, 'icon.svg'), svgIcon)
console.log('wrote', join(outDir, 'icon.svg'))

writePng(join(outDir, 'icon-192.png'), 192, 192, drawIcon(192))
writePng(join(outDir, 'icon-512.png'), 512, 512, drawIcon(512))
// Maskable: glyph at 80% so rounded-mask cropping never clips it.
writePng(join(outDir, 'maskable-512.png'), 512, 512, drawIcon(512, 0.8))
