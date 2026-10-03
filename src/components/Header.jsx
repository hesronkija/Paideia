/**
 * Header.jsx — sticky app bar: brand, EN/SW language toggle,
 * and the install-to-homescreen button (appears when the browser
 * fires `beforeinstallprompt`, i.e. the app is installable).
 */
import { useLang } from '../lang.jsx'
import { ui } from '../ui.js'

export default function Header({ installEvent, onHome }) {
  const { lang, setLang, t } = useLang()

  const install = async () => {
    if (!installEvent) return
    installEvent.prompt()
    await installEvent.userChoice
  }

  return (
    <header className="app-header">
      <button className="brand" onClick={onHome} aria-label="Paideia home">
        <span className="brand-pi">π</span> Paideia
      </button>

      <div className="header-actions">
        {installEvent && (
          <button className="btn btn-small" onClick={install}>
            ⤓ {t(ui.installApp)}
          </button>
        )}
        <div className="lang-toggle" role="group" aria-label="Language / Lugha">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
          <button
            className={lang === 'sw' ? 'active' : ''}
            onClick={() => setLang('sw')}
            aria-pressed={lang === 'sw'}
          >
            SW
          </button>
        </div>
      </div>
    </header>
  )
}
