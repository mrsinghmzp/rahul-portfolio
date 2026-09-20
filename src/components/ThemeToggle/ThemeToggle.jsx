import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { LuPalette, LuCheck } from 'react-icons/lu'
import './ThemeToggle.css'

export default function ThemeToggle({ compact = false }) {
  const { theme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredPillId, setHoveredPillId] = useState(null)
  const [isQuickHovered, setIsQuickHovered] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentTheme = themes.find((t) => t.id === theme) || themes[0]

  if (compact) {
    // Compact icon-only / dropdown button for floating quick switcher
    return (
      <div className="theme-toggle-compact-wrap" ref={dropdownRef}>
        <button
          type="button"
          className="liquid-glass-btn theme-quick-btn"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsQuickHovered(true)}
          onMouseLeave={() => setIsQuickHovered(false)}
          aria-label="Toggle Theme Menu"
        >
          <span className="theme-quick-icon" style={{ color: currentTheme.color }}>
            {currentTheme.icon}
          </span>
          <span className="theme-quick-label">{currentTheme.shortName}</span>
          <LuPalette className="theme-palette-icon" />
        </button>

        {/* iOS Fluid Water Drop Tooltip for Compact Button on Hover */}
        <AnimatePresence>
          {!isOpen && isQuickHovered && (
            <div className="water-drop-anchor water-drop-anchor--compact">
              <motion.div
                className="water-drop-tooltip water-drop-tooltip--compact"
                initial={{ opacity: 0, scale: 0.35, y: 8, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.5, y: 5, filter: 'blur(8px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 340,
                  damping: 26,
                  mass: 0.7,
                }}
              >
                <div className="water-drop-tail water-drop-tail--bottom" />
                <div className="water-drop-sheen" />
                <motion.div
                  className="water-drop-content"
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="water-drop-tag" style={{ color: currentTheme.color }}>
                    {currentTheme.icon} {currentTheme.name}
                  </span>
                  <span className="water-drop-desc">{currentTheme.description}</span>
                </motion.div>
                <div className="water-drop-bead" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="liquid-glass-panel theme-dropdown-menu"
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.94 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="theme-dropdown-header">Select Theme</div>
              <div className="theme-dropdown-list">
                {themes.map((t) => {
                  const isActive = t.id === theme
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`theme-dropdown-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setTheme(t.id)
                        setIsOpen(false)
                      }}
                    >
                      <span className="theme-item-icon" style={{ color: t.color }}>
                        {t.icon}
                      </span>
                      <div className="theme-item-info">
                        <span className="theme-item-name">{t.name}</span>
                        <span className="theme-item-desc">{t.description}</span>
                      </div>
                      {isActive && <LuCheck className="theme-item-check" />}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Segmented Liquid Glass Pill Bar for Header
  return (
    <div className="liquid-glass-bar theme-pill-bar">
      {themes.map((t) => {
        const isActive = t.id === theme
        const isHovered = hoveredPillId === t.id

        return (
          <div
            key={t.id}
            className="theme-pill-btn-wrap"
            onMouseEnter={() => setHoveredPillId(t.id)}
            onMouseLeave={() => setHoveredPillId(null)}
          >
            <button
              type="button"
              className={`theme-pill-btn ${isActive ? 'theme-pill-btn--active' : ''}`}
              onClick={() => setTheme(t.id)}
              aria-label={`Select ${t.name} theme`}
            >
              <span
                className="theme-pill-icon"
                style={{ color: isActive ? 'inherit' : t.color }}
              >
                {t.icon}
              </span>
              <span className="theme-pill-name">{t.shortName}</span>
              {isActive && (
                <motion.span
                  layoutId="activeThemeLiquidPill"
                  className="theme-pill-liquid-indicator"
                  transition={{ type: 'spring', stiffness: 360, damping: 28, mass: 0.8 }}
                />
              )}
            </button>

            {/* iOS Fluid Water Droplet Description Tooltip on Hover */}
            <AnimatePresence>
              {isHovered && (
                <div className="water-drop-anchor">
                  <motion.div
                    className="water-drop-tooltip"
                    initial={{ opacity: 0, scale: 0.35, y: -8, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.5, y: -4, filter: 'blur(8px)' }}
                    transition={{
                      type: 'spring',
                      stiffness: 340,
                      damping: 26,
                      mass: 0.7,
                    }}
                  >
                    {/* Fluid droplet stem pointing up to button */}
                    <div className="water-drop-tail" />
                    {/* Gloss surface reflection */}
                    <div className="water-drop-sheen" />
                    <motion.div
                      className="water-drop-content"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="water-drop-tag" style={{ color: t.color }}>
                        {t.icon} {t.name}
                      </span>
                      <span className="water-drop-desc">{t.description}</span>
                    </motion.div>
                    {/* Floating micro water droplet bead */}
                    <div className="water-drop-bead" />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
