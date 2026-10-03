/**
 * G.jsx — a tiny SVG helper for the animated scenes.
 *
 * Scenes render declaratively: given the current `step`, each element
 * decides whether it is visible yet. Elements appearing for the first
 * time on the current step get the `scene-anim` class, which ScenePlayer
 * animates in with GSAP. Elements from earlier steps render without the
 * class, so they don't re-animate.
 */
export function G({ show, fresh, children, ...rest }) {
  if (!show) return null
  return (
    <g className={fresh ? 'scene-anim' : undefined} {...rest}>
      {children}
    </g>
  )
}
