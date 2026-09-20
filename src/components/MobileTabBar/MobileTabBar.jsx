import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './MobileTabBar.css'

export default function MobileTabBar() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <nav className="mobile-tab-bar" aria-label="Mobile Theme Switcher Tab Bar">
      <div className="mobile-liquid-theme-bar">
        {themes.map((t) => {
          const isActive = t.id === theme
          return (
            <button
              key={t.id}
              type="button"
              className={`mobile-theme-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setTheme(t.id)}
              aria-label={`Switch to ${t.name} theme`}
              title={t.name}
            >
              <span
                className="mobile-theme-tab-icon"
                style={{ color: isActive ? '#ffffff' : t.color }}
              >
                {t.icon}
              </span>
              <span className="mobile-theme-tab-label">{t.shortName}</span>

              {isActive && (
                <motion.span
                  layoutId="mobileActiveThemeLiquidPill"
                  className="mobile-theme-tab-indicator"
                  transition={{ type: 'spring', stiffness: 480, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
