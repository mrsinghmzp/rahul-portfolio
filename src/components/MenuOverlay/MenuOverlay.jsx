import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import './MenuOverlay.css'

const NAV_LINKS = [
  { label: 'Home',    href: '#hero',    index: '01' },
  { label: 'Work',    href: '#work',    index: '02' },
  { label: 'About',   href: '#about',   index: '03' },
  { label: 'Contact', href: '#contact', index: '04' },
]

const SOCIAL_LINKS = [
  { icon: <FaGithub />,     label: 'GitHub',   href: 'https://github.com/mrsinghmzp' },
  { icon: <FaLinkedinIn />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/singhmzp' },
  { icon: <FaEnvelope />,   label: 'Email',    href: 'mailto:rahul.cs6765@gmail.com' },
]

const overlayVariants = {
  hidden: { clipPath: 'ellipse(0% 0% at 95% 5%)', opacity: 0 },
  visible: {
    clipPath: 'ellipse(150% 150% at 95% 5%)',
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    clipPath: 'ellipse(0% 0% at 95% 5%)',
    opacity: 0,
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] }
  }
}

const navItemVariants = {
  hidden:  { y: 60, opacity: 0 },
  visible: (i) => ({
    y: 0, opacity: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }),
  exit: { y: -30, opacity: 0, transition: { duration: 0.3 } }
}

export default function MenuOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="menu-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close Button */}
          <button className="menu-close" onClick={onClose} aria-label="Close menu">
            <span />
            <span />
          </button>

          <div className="menu-overlay-inner">
            <nav className="menu-nav">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  className="menu-nav-item"
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={i}
                >
                  <span className="menu-nav-index">{link.index}</span>
                  <a href={link.href} className="menu-nav-link" onClick={onClose}>
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="menu-social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              {SOCIAL_LINKS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="menu-social-link">
                  <span className="menu-social-icon">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
