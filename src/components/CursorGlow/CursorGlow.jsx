import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const THEME_GLOWS = {
  emerald: {
    primary: 'rgba(0, 220, 130, 0.13)',
    secondary: 'rgba(0, 180, 90, 0.06)',
  },
  blue: {
    primary: 'rgba(56, 189, 248, 0.16)',
    secondary: 'rgba(14, 165, 233, 0.07)',
  },
  baba: {
    primary: 'rgba(255, 119, 0, 0.18)',
    secondary: 'rgba(255, 153, 51, 0.08)',
  },
  robotic: {
    primary: 'rgba(0, 255, 170, 0.16)',
    secondary: 'rgba(0, 240, 255, 0.07)',
  },
}

export default function CursorGlow() {
  const { theme } = useTheme()
  const glowRef = useRef(null)
  const target = useRef({ x: -600, y: -600 })
  const current = useRef({ x: -600, y: -600 })
  const raf = useRef(null)
  const glowColors = THEME_GLOWS[theme] || THEME_GLOWS.emerald

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.07)
      current.current.y = lerp(current.current.y, target.current.y, 0.07)

      if (glowRef.current) {
        const x = current.current.x
        const y = current.current.y
        glowRef.current.style.background = `
          radial-gradient(
            circle 480px at ${x}px ${y}px,
            ${glowColors.primary} 0%,
            ${glowColors.secondary} 40%,
            transparent 70%
          )
        `
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [glowColors])

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'none',
        willChange: 'background',
      }}
    />
  )
}
