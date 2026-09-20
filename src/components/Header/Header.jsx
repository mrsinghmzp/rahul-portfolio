import { useRef } from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Header.css'

function MagneticLink({ href, children }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      className="nav-link"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  )
}

export default function Header({ scrolled, onMenuOpen }) {
  return (
    <>
      {/* Top Static Header */}
      <motion.header
        className="header"
        animate={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? 'none' : 'auto' }}
        transition={{ duration: 0.4 }}
      >
        <div className="header-inner container">
          <a href="#hero" className="logo">© Code by Rahul</a>
          <ThemeToggle />
          <nav className="nav">
            <MagneticLink href="#work">Work</MagneticLink>
            <MagneticLink href="#about">About</MagneticLink>
            <MagneticLink href="#contact">Contact</MagneticLink>
          </nav>
        </div>
      </motion.header>

      {/* Floating Menu Button (appears on scroll) */}
      <motion.button
        className="menu-fab"
        onClick={onMenuOpen}
        animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.6, pointerEvents: scrolled ? 'auto' : 'none' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Open menu"
      >
        <span className="menu-fab-lines">
          <span /><span />
        </span>
        <span className="menu-fab-label">Menu</span>
      </motion.button>
    </>
  )
}
