import { useState, useEffect } from 'react'
import Cursor from './components/Cursor/Cursor'
import CursorGlow from './components/CursorGlow/CursorGlow'
import WaterCursor from './components/WaterCursor/WaterCursor'
import Particles from './components/Particles/Particles'
import FloatingBackground from './components/FloatingBackground/FloatingBackground'
import Header from './components/Header/Header'
import MenuOverlay from './components/MenuOverlay/MenuOverlay'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import About from './components/About/About'
import Work from './components/Work/Work'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import MobileTabBar from './components/MobileTabBar/MobileTabBar'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      {/* Background layers */}
      <Particles count={180} />
      <FloatingBackground />
      <WaterCursor />
      <CursorGlow />

      {/* Floating Theme Switcher Widget */}
      <div className="theme-floating-widget">
        <ThemeToggle compact />
      </div>

      {/* UI */}
      <Cursor />
      <Header scrolled={scrolled} onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main style={{ position: 'relative', zIndex: 3 }}>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Contact />
      </main>

      {/* Floating Liquid Glass Tab Bar for Mobile (Theme Toggle Only) */}
      <MobileTabBar />
    </>
  )
}

export default App

