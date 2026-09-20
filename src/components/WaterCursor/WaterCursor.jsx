import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import './WaterCursor.css'

export default function WaterCursor() {
  const { theme } = useTheme()
  const canvasRef = useRef(null)
  const lastPos = useRef({ x: -100, y: -100 })
  const ripples = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    // Water effect ONLY runs on Ocean (Blue) Theme
    if (theme !== 'blue') return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // Oceanic cyan & azure colors
    const rgb = {
      primary: '56, 189, 248',
      secondary: '14, 165, 233',
      highlight: '224, 242, 254',
    }

    const spawnRipple = (x, y, maxR = 55, power = 1) => {
      ripples.current.push({
        x,
        y,
        r: 2,
        maxR: maxR * (0.85 + Math.random() * 0.3),
        speed: (1.5 + Math.random() * 0.5) * power,
        alpha: 0.28 * power,
        initialAlpha: 0.28 * power,
        rgb,
        lineWidth: 1.2,
      })
    }

    const onMouseMove = (e) => {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const dist = Math.hypot(dx, dy)

      // Emit a gentle, smooth ripple every 28px of cursor motion
      if (dist > 28) {
        const speedFactor = Math.min(1.5, Math.max(0.8, dist / 32))
        spawnRipple(e.clientX, e.clientY, 50 * speedFactor, Math.min(1.0, speedFactor))
        lastPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const onMouseDown = (e) => {
      // Gentle water splash ripple on click
      spawnRipple(e.clientX, e.clientY, 80, 1.2)
      setTimeout(() => {
        spawnRipple(e.clientX, e.clientY, 48, 0.75)
      }, 110)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      const activeRipples = ripples.current
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const rip = activeRipples[i]
        rip.r += rip.speed
        const progress = rip.r / rip.maxR

        // Silky smooth quadratic falloff - zero visual interference
        const ease = Math.pow(1 - progress, 1.4)
        rip.alpha = ease * rip.initialAlpha

        if (progress >= 1 || rip.alpha <= 0.005) {
          activeRipples.splice(i, 1)
          continue
        }

        // 1. Outer Soft Water Wave Ring
        ctx.beginPath()
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rip.rgb.primary}, ${rip.alpha.toFixed(3)})`
        ctx.lineWidth = Math.max(0.4, rip.lineWidth * (1 - progress * 0.5))
        ctx.stroke()

        // 2. Inner Light Reflection Caustic (very soft)
        if (rip.r > 6 && rip.alpha > 0.06) {
          ctx.beginPath()
          ctx.arc(rip.x, rip.y, Math.max(0, rip.r - 2), 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${rip.rgb.highlight}, ${(rip.alpha * 0.45).toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [theme])

  // STRICTLY ONLY active in Blue Ocean Theme
  if (theme !== 'blue') return null

  return (
    <canvas
      ref={canvasRef}
      className="water-cursor-canvas"
      aria-hidden="true"
    />
  )
}
