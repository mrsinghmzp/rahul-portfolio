import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const THEME_COLORS = {
  emerald: [
    'rgba(255, 215, 80,',  // gold
    'rgba(255, 190, 40,',  // amber
    'rgba(0,  230, 140,',  // bright emerald
    'rgba(120, 255, 180,', // mint
    'rgba(255, 245, 130,', // pale yellow
  ],
  blue: [
    'rgba(56, 189, 248,',  // sky blue
    'rgba(14, 165, 233,',  // cyan
    'rgba(96, 165, 250,',  // soft blue
    'rgba(192, 132, 252,', // violet accent
    'rgba(224, 242, 254,', // icy white
  ],
  baba: [
    'rgba(255, 119, 0,',   // saffron orange
    'rgba(255, 153, 51,',  // amber
    'rgba(255, 193, 7,',   // sacred gold
    'rgba(255, 87, 34,',   // deep orange
    'rgba(255, 235, 153,', // golden glow
  ],
  robotic: [
    'rgba(0, 255, 170,',   // neon matrix green
    'rgba(0, 240, 255,',   // cyber cyan
    'rgba(34, 197, 94,',   // terminal green
    'rgba(167, 139, 250,', // mech purple
    'rgba(240, 253, 250,', // white spark
  ],
}

function createParticle(w, h, colorList) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 1.4 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.6 + 0.3,
    color: colorList[Math.floor(Math.random() * colorList.length)],
  }
}

export default function Particles({ count = 180 }) {
  const { theme } = useTheme()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const colors = THEME_COLORS[theme] || THEME_COLORS.emerald

    let w = (canvas.width  = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let particles = Array.from({ length: count }, () => createParticle(w, h, colors))
    let raf

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        const alpha = ((Math.sin(t * 0.001 * p.speed + p.phase) + 1) / 2) * 0.75
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${alpha.toFixed(2)})`
        ctx.fill()

        // subtle cross/star gleam on larger particles
        if (p.size > 1.0 && alpha > 0.5) {
          ctx.strokeStyle = `${p.color}${(alpha * 0.4).toFixed(2)})`
          ctx.lineWidth = 0.6
          const arm = p.size * 2.5
          ctx.beginPath()
          ctx.moveTo(p.x - arm, p.y)
          ctx.lineTo(p.x + arm, p.y)
          ctx.moveTo(p.x, p.y - arm)
          ctx.lineTo(p.x, p.y + arm)
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    const onResize = () => {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
      particles = Array.from({ length: count }, () => createParticle(w, h))
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [count, theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.65,
      }}
    />
  )
}
