import { useMemo, useRef, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import './FloatingBackground.css'

// ─── Ocean Species SVGs (Blue Theme) ────────────────────────────────
function SharkSvg({ className }) {
  return (
    <svg viewBox="0 0 200 95" className={className} fill="currentColor">
      {/* Dynamic, streamlined shark body */}
      <path
        d="M 182 46
           C 162 36 132 32 96 35
           C 89 23 81 10 70 4
           C 72 18 70 31 63 39
           C 46 44 28 47 4 47
           C 16 53 28 55 38 55
           C 43 67 52 80 60 86
           C 58 73 58 63 63 57
           C 92 59 130 55 160 49
           C 170 58 180 70 190 77
           C 185 66 177 56 174 50
           C 184 46 191 40 197 28
           C 190 32 184 38 182 46 Z"
      />
      {/* Eye */}
      <circle cx="26" cy="43" r="2.5" fill="#ffffff" opacity="0.9" />
      <circle cx="25.5" cy="43" r="1.3" fill="#000000" />
      {/* Gill Slits */}
      <path
        d="M 44 42 Q 45 47 44 52 M 48 42 Q 49 47 48 52 M 52 43 Q 53 47 52 51"
        stroke="rgba(0, 0, 0, 0.45)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Secondary Fin details */}
      <path d="M 132 36 Q 137 30 142 29 Q 140 35 137 39 Z" fill="currentColor" opacity="0.85" />
      <path d="M 136 54 Q 141 60 146 61 Q 143 56 140 52 Z" fill="currentColor" opacity="0.85" />
    </svg>
  )
}

function StarfishSvg({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {/* 5-pointed organic sea star */}
      <path
        d="M 50 5
           C 53 24 56 32 72 35
           C 88 38 96 44 95 54
           C 82 56 72 61 68 74
           C 64 88 60 95 50 92
           C 40 95 36 88 32 74
           C 28 61 18 56 5 54
           C 4 44 12 38 28 35
           C 44 32 47 24 50 5 Z"
      />
      {/* Center texture ring & bumps */}
      <circle cx="50" cy="50" r="6" fill="rgba(255, 255, 255, 0.45)" />
      <circle cx="50" cy="30" r="2.5" fill="rgba(255, 255, 255, 0.45)" />
      <circle cx="50" cy="18" r="1.8" fill="rgba(255, 255, 255, 0.4)" />
      <circle cx="70" cy="44" r="2.5" fill="rgba(255, 255, 255, 0.45)" />
      <circle cx="82" cy="50" r="1.8" fill="rgba(255, 255, 255, 0.4)" />
      <circle cx="62" cy="66" r="2.5" fill="rgba(255, 255, 255, 0.45)" />
      <circle cx="58" cy="80" r="1.8" fill="rgba(255, 255, 255, 0.4)" />
      <circle cx="38" cy="66" r="2.5" fill="rgba(255, 255, 255, 0.45)" />
      <circle cx="42" cy="80" r="1.8" fill="rgba(255, 255, 255, 0.4)" />
      <circle cx="30" cy="44" r="2.5" fill="rgba(255, 255, 255, 0.45)" />
      <circle cx="18" cy="50" r="1.8" fill="rgba(255, 255, 255, 0.4)" />
    </svg>
  )
}

function JellyfishSvg({ className }) {
  return (
    <svg viewBox="0 0 100 140" className={className} fill="none" stroke="currentColor">
      {/* Translucent Bell / Umbrella */}
      <path
        d="M 20 48 C 20 16 80 16 80 48 C 72 54 65 50 50 53 C 35 50 28 54 20 48 Z"
        fill="currentColor"
        fillOpacity="0.22"
        strokeWidth="2.5"
      />
      <path d="M 32 44 C 36 26 64 26 68 44" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
      {/* Inner Oral Arms */}
      <path d="M 45 53 Q 40 73 46 93 Q 50 113 44 133" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
      <path d="M 55 53 Q 60 73 54 93 Q 50 113 56 133" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
      {/* Outer Floating Tentacles */}
      <path d="M 26 51 Q 22 73 30 98 Q 36 118 28 136" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 74 51 Q 78 73 70 98 Q 64 118 72 136" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 36 52 Q 32 78 40 103 Q 44 123 38 134" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M 64 52 Q 68 78 60 103 Q 56 123 62 134" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function MantaRaySvg({ className }) {
  return (
    <svg viewBox="0 0 160 120" className={className} fill="currentColor">
      {/* Winged Manta Ray body */}
      <path
        d="M 80 18
           C 74 10 68 10 66 16
           C 65 22 72 24 70 28
           C 50 33 15 53 2 68
           C 25 68 55 62 72 58
           C 74 73 76 88 79 116
           C 80 118 81 118 81 116
           C 84 88 86 73 88 58
           C 105 62 135 68 158 68
           C 145 53 110 33 90 28
           C 88 24 95 22 94 16
           C 92 10 86 10 80 18 Z"
      />
      {/* Wing highlights */}
      <path d="M 22 66 Q 50 61 70 57" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
      <path d="M 138 66 Q 110 61 90 57" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function FishSchoolSvg({ className }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="currentColor">
      <path d="M 20 18 Q 30 14 38 18 Q 42 12 45 10 Q 42 18 45 26 Q 42 24 38 18 Q 30 22 20 18 Z" />
      <path d="M 45 32 Q 55 28 63 32 Q 67 26 70 24 Q 67 32 70 40 Q 67 38 63 32 Q 55 36 45 32 Z" opacity="0.8" />
      <path d="M 12 40 Q 22 36 30 40 Q 34 34 37 32 Q 34 40 37 48 Q 34 46 30 40 Q 22 44 12 40 Z" opacity="0.75" />
      <path d="M 75 16 Q 85 12 93 16 Q 97 10 100 8 Q 97 16 100 24 Q 97 22 93 16 Q 85 20 75 16 Z" opacity="0.9" />
    </svg>
  )
}

// ─── Karma Coder (Baba) SVGs ─────────────────────────────────────────
function OmSvg({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fontSize="76"
        fontFamily="'Rozha One', 'Yatra One', 'Noto Serif Devanagari', 'Georgia', serif"
        fontWeight="bold"
        fill="currentColor"
      >
        ॐ
      </text>
    </svg>
  )
}

function SwastikSvg({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} stroke="currentColor" fill="currentColor">
      <line x1="50" y1="12" x2="50" y2="88" strokeWidth="8" strokeLinecap="square" />
      <line x1="12" y1="50" x2="88" y2="50" strokeWidth="8" strokeLinecap="square" />
      <line x1="50" y1="12" x2="85" y2="12" strokeWidth="8" strokeLinecap="square" />
      <line x1="88" y1="50" x2="88" y2="85" strokeWidth="8" strokeLinecap="square" />
      <line x1="50" y1="88" x2="15" y2="88" strokeWidth="8" strokeLinecap="square" />
      <line x1="12" y1="50" x2="12" y2="15" strokeWidth="8" strokeLinecap="square" />
      <circle cx="31" cy="31" r="5" stroke="none" />
      <circle cx="69" cy="31" r="5" stroke="none" />
      <circle cx="69" cy="69" r="5" stroke="none" />
      <circle cx="31" cy="69" r="5" stroke="none" />
    </svg>
  )
}

// ─── Robotic Theme SVGs ─────────────────────────────────────────────
function RobotHeadSvg({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
      <line x1="50" y1="28" x2="50" y2="12" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="10" r="4" fill="currentColor" />
      <rect x="18" y="44" width="6" height="18" rx="2" fill="currentColor" />
      <rect x="76" y="44" width="6" height="18" rx="2" fill="currentColor" />
      <rect x="24" y="28" width="52" height="48" rx="12" strokeWidth="3" fill="rgba(0,255,170,0.06)" />
      <rect x="32" y="40" width="36" height="14" rx="4" strokeWidth="2" fill="rgba(0,240,255,0.18)" />
      <circle cx="41" cy="47" r="4" fill="currentColor" />
      <circle cx="59" cy="47" r="4" fill="currentColor" />
      <line x1="36" y1="64" x2="64" y2="64" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="69" x2="58" y2="69" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function GearSvg({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
      <circle cx="50" cy="50" r="32" strokeWidth="3" strokeDasharray="14 7" />
      <circle cx="50" cy="50" r="18" strokeWidth="3" fill="rgba(0,255,170,0.08)" />
      <circle cx="50" cy="50" r="7" fill="currentColor" />
    </svg>
  )
}

function ChipSvg({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
      <rect x="30" y="30" width="40" height="40" rx="6" strokeWidth="3" fill="rgba(0,240,255,0.08)" />
      <rect x="42" y="42" width="16" height="16" rx="2" strokeWidth="2" fill="currentColor" fillOpacity="0.3" />
      <path
        d="M 38 18 L 38 30 M 50 18 L 50 30 M 62 18 L 62 30
           M 38 70 L 38 82 M 50 70 L 50 82 M 62 70 L 62 82
           M 18 38 L 30 38 M 18 50 L 30 50 M 18 62 L 30 62
           M 70 38 L 82 38 M 70 50 L 82 50 M 70 62 L 82 62"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HexNodeSvg({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
      <polygon points="50 15, 80 32, 80 68, 50 85, 20 68, 20 32" strokeWidth="2.5" fill="rgba(0,255,170,0.05)" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      <line x1="50" y1="20" x2="50" y2="44" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  )
}

export default function FloatingBackground() {
  const { theme } = useTheme()
  const creatureRefs = useRef({})
  const bubbleRefs = useRef({})
  const mousePos = useRef({ x: -2000, y: -2000, vx: 0, vy: 0 })
  const offsets = useRef({})

  // Cursor disturbance physics in Blue Ocean theme
  useEffect(() => {
    if (theme !== 'blue') return

    const onMouseMove = (e) => {
      mousePos.current.vx = e.clientX - mousePos.current.x
      mousePos.current.vy = e.clientY - mousePos.current.y
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    const onMouseLeave = () => {
      mousePos.current.x = -2000
      mousePos.current.y = -2000
      mousePos.current.vx = 0
      mousePos.current.vy = 0
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    let rafId
    const loop = () => {
      mousePos.current.vx *= 0.85
      mousePos.current.vy *= 0.85

      const mx = mousePos.current.x
      const my = mousePos.current.y

      // 1. Disturb Ocean Creatures
      for (const [id, el] of Object.entries(creatureRefs.current)) {
        if (!el) continue

        if (!offsets.current[id]) {
          offsets.current[id] = { x: 0, y: 0, vx: 0, vy: 0, rot: 0, rotVel: 0, scale: 1 }
        }
        const state = offsets.current[id]

        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - mx
        const dy = cy - my
        const dist = Math.hypot(dx, dy)

        const isShark = id.startsWith('shark')
        const isStarfish = id.startsWith('star')
        const isJelly = id.startsWith('jelly')
        const isFish = id.startsWith('fish')
        const isManta = id.startsWith('manta')

        const radius = isShark ? 240 : isManta ? 220 : isFish ? 200 : 160
        const maxForce = isShark ? 35 : isFish ? 45 : isStarfish ? 38 : 30

        if (dist < radius && dist > 1) {
          const force = Math.pow(1 - dist / radius, 1.4) * maxForce
          const nx = dx / dist
          const ny = dy / dist

          state.vx += nx * force * 0.4 + mousePos.current.vx * 0.08
          state.vy += ny * force * 0.4 + mousePos.current.vy * 0.08

          if (isStarfish) {
            state.rotVel += (dx > 0 ? 1 : -1) * force * 0.35
          } else if (isShark) {
            state.rot = (dx > 0 ? 1 : -1) * force * 0.35
          } else if (isJelly) {
            state.scale = Math.max(0.7, 1 - force * 0.015)
          }
        }

        state.x += state.vx
        state.y += state.vy
        state.rot = (state.rot || 0) + (state.rotVel || 0)

        state.vx *= 0.86
        state.vy *= 0.86
        state.rotVel *= 0.88
        state.x *= 0.92
        state.y *= 0.92
        state.rot *= 0.92
        state.scale = 1 + ((state.scale || 1) - 1) * 0.9

        if (Math.abs(state.x) > 0.05 || Math.abs(state.y) > 0.05 || Math.abs(state.rot) > 0.05) {
          el.style.transform = `translate3d(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px, 0) rotate(${state.rot.toFixed(1)}deg) scale(${state.scale.toFixed(2)})`
          el.style.filter = `drop-shadow(0 0 ${Math.min(25, 10 + Math.hypot(state.x, state.y))}px rgba(56, 189, 248, 0.75))`
        } else {
          el.style.transform = ''
          el.style.filter = ''
        }
      }

      // 2. Disturb Ocean Bubbles
      for (const [id, el] of Object.entries(bubbleRefs.current)) {
        if (!el) continue

        if (!offsets.current[`b-${id}`]) {
          offsets.current[`b-${id}`] = { x: 0, y: 0, vx: 0, vy: 0 }
        }
        const bState = offsets.current[`b-${id}`]

        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - mx
        const dy = cy - my
        const dist = Math.hypot(dx, dy)

        if (dist < 110 && dist > 1) {
          const force = (1 - dist / 110) * 32
          const nx = dx / dist
          const ny = dy / dist
          bState.vx += nx * force * 0.5
          bState.vy += ny * force * 0.5
        }

        bState.x += bState.vx
        bState.y += bState.vy
        bState.vx *= 0.84
        bState.vy *= 0.84
        bState.x *= 0.9
        bState.y *= 0.9

        if (Math.abs(bState.x) > 0.05 || Math.abs(bState.y) > 0.05) {
          el.style.transform = `translate3d(${bState.x.toFixed(1)}px, ${bState.y.toFixed(1)}px, 0)`
        } else {
          el.style.transform = ''
        }
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [theme])

  // ─── Ocean Theme Creatures & Bubbles ─────────────────────────────
  const oceanCreatures = useMemo(() => [
    // Apex Sharks cruising through the open ocean
    {
      id: 'shark-1',
      type: 'shark',
      direction: 'ltr',
      top: '20%',
      width: 190,
      height: 90,
      duration: 26,
      delay: 0,
      opacity: 0.52,
    },
    {
      id: 'shark-2',
      type: 'shark',
      direction: 'rtl',
      top: '64%',
      width: 145,
      height: 70,
      duration: 34,
      delay: -12,
      opacity: 0.42,
    },
    {
      id: 'shark-3',
      type: 'shark',
      direction: 'ltr',
      top: '44%',
      width: 105,
      height: 50,
      duration: 40,
      delay: -20,
      opacity: 0.28,
    },
    // Manta Ray soaring gracefully
    {
      id: 'manta-1',
      type: 'manta',
      direction: 'ltr',
      top: '34%',
      width: 150,
      height: 112,
      duration: 36,
      delay: -6,
      opacity: 0.44,
    },
    // Starfish floating and tumbling across ocean layers
    {
      id: 'star-1',
      type: 'starfish',
      left: '10%',
      top: '16%',
      size: 60,
      duration: 24,
      delay: -2,
      opacity: 0.5,
      driftY: 50,
    },
    {
      id: 'star-2',
      type: 'starfish',
      left: '86%',
      top: '26%',
      size: 52,
      duration: 28,
      delay: -7,
      opacity: 0.46,
      driftY: 55,
    },
    {
      id: 'star-3',
      type: 'starfish',
      left: '66%',
      top: '70%',
      size: 68,
      duration: 22,
      delay: -12,
      opacity: 0.52,
      driftY: 45,
    },
    {
      id: 'star-4',
      type: 'starfish',
      left: '24%',
      top: '78%',
      size: 46,
      duration: 26,
      delay: -16,
      opacity: 0.42,
      driftY: 40,
    },
    {
      id: 'star-5',
      type: 'starfish',
      left: '50%',
      top: '52%',
      size: 40,
      duration: 30,
      delay: -19,
      opacity: 0.38,
      driftY: 42,
    },
    // Jellyfish rising with glowing pulses
    {
      id: 'jelly-1',
      type: 'jellyfish',
      left: '16%',
      top: '38%',
      width: 64,
      height: 90,
      duration: 18,
      delay: -3,
      opacity: 0.48,
    },
    {
      id: 'jelly-2',
      type: 'jellyfish',
      left: '76%',
      top: '52%',
      width: 76,
      height: 106,
      duration: 22,
      delay: -9,
      opacity: 0.5,
    },
    {
      id: 'jelly-3',
      type: 'jellyfish',
      left: '88%',
      top: '12%',
      width: 54,
      height: 76,
      duration: 20,
      delay: -14,
      opacity: 0.38,
    },
    // Fish Schools darting by
    {
      id: 'fish-1',
      type: 'fishschool',
      direction: 'ltr',
      top: '14%',
      width: 110,
      height: 55,
      duration: 22,
      delay: -4,
      opacity: 0.46,
    },
    {
      id: 'fish-2',
      type: 'fishschool',
      direction: 'rtl',
      top: '58%',
      width: 90,
      height: 45,
      duration: 26,
      delay: -15,
      opacity: 0.4,
    },
  ], [])

  // ─── Ambient Micro-Bubbles (Only in Ocean Theme, minimal & non-intrusive) ───
  const oceanBubbles = useMemo(() => {
    const edgePositions = [5, 14, 25, 75, 86, 94]
    return edgePositions.map((pos, i) => ({
      id: i,
      left: pos,
      size: 4 + (i % 3) * 2,
      duration: 24 + (i % 3) * 5,
      delay: -(i * 4.2),
      opacity: 0.12 + (i % 2) * 0.05,
      wobble: 6 + (i % 2) * 4,
    }))
  }, [])

  // ─── Karma Coder (Baba) Elements ──────────────────────────────────
  const babaElements = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      type: i % 2 === 0 ? 'om' : 'swastik',
      left: `${(i * 4.6 + Math.random() * 4) % 96}%`,
      top: `${(i * 4.5 + Math.random() * 5) % 96}%`,
      size: 26 + (i % 5) * 10,
      duration: 18 + (i % 7) * 4,
      delay: -(i * 2.2),
      opacity: 0.28 + ((i % 4) * 0.12),
      driftDistance: 35 + (i % 4) * 20,
    }))
  }, [])

  // ─── Robotic Theme Elements ───────────────────────────────────────
  const roboticElements = useMemo(() => {
    const types = ['robot', 'gear', 'chip', 'hex']
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      type: types[i % types.length],
      left: `${(i * 4.2 + Math.random() * 4) % 96}%`,
      top: `${(i * 4.4 + Math.random() * 6) % 96}%`,
      size: 28 + (i % 4) * 12,
      duration: 20 + (i % 6) * 5,
      delay: -(i * 2.5),
      opacity: 0.24 + ((i % 4) * 0.1),
    }))
  }, [])

  // ─── RENDER PER ACTIVE THEME ──────────────────────────────────────
  if (theme === 'blue') {
    return (
      <div className="floating-layer floating-layer--ocean" aria-hidden="true">
        {/* Deep Ocean Sun Caustics / Sunbeams */}
        <div className="ocean-light-beams" />
        <div className="ocean-abyss-gradient" />

        {/* Ocean Species: Sharks, Starfish, Jellyfish, Manta Ray, Fish */}
        {oceanCreatures.map((c) => {
          if (c.type === 'shark') {
            return (
              <div
                key={c.id}
                className={`ocean-creature ocean-shark ocean-shark--${c.direction}`}
                style={{
                  top: c.top,
                  width: `${c.width}px`,
                  height: `${c.height}px`,
                  opacity: c.opacity,
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                }}
              >
                <div
                  ref={(el) => { creatureRefs.current[c.id] = el }}
                  className="ocean-creature-inner"
                >
                  <SharkSvg className="ocean-svg ocean-svg--shark" />
                </div>
              </div>
            )
          }

          if (c.type === 'starfish') {
            return (
              <div
                key={c.id}
                className="ocean-creature ocean-starfish"
                style={{
                  left: c.left,
                  top: c.top,
                  width: `${c.size}px`,
                  height: `${c.size}px`,
                  opacity: c.opacity,
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                  '--drift-y': `${c.driftY}px`,
                }}
              >
                <div
                  ref={(el) => { creatureRefs.current[c.id] = el }}
                  className="ocean-creature-inner"
                >
                  <StarfishSvg className="ocean-svg ocean-svg--starfish" />
                </div>
              </div>
            )
          }

          if (c.type === 'jellyfish') {
            return (
              <div
                key={c.id}
                className="ocean-creature ocean-jellyfish"
                style={{
                  left: c.left,
                  top: c.top,
                  width: `${c.width}px`,
                  height: `${c.height}px`,
                  opacity: c.opacity,
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                }}
              >
                <div
                  ref={(el) => { creatureRefs.current[c.id] = el }}
                  className="ocean-creature-inner"
                >
                  <JellyfishSvg className="ocean-svg ocean-svg--jelly" />
                </div>
              </div>
            )
          }

          if (c.type === 'manta') {
            return (
              <div
                key={c.id}
                className={`ocean-creature ocean-manta ocean-manta--${c.direction}`}
                style={{
                  top: c.top,
                  width: `${c.width}px`,
                  height: `${c.height}px`,
                  opacity: c.opacity,
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                }}
              >
                <div
                  ref={(el) => { creatureRefs.current[c.id] = el }}
                  className="ocean-creature-inner"
                >
                  <MantaRaySvg className="ocean-svg ocean-svg--manta" />
                </div>
              </div>
            )
          }

          if (c.type === 'fishschool') {
            return (
              <div
                key={c.id}
                className={`ocean-creature ocean-school ocean-school--${c.direction}`}
                style={{
                  top: c.top,
                  width: `${c.width}px`,
                  height: `${c.height}px`,
                  opacity: c.opacity,
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                }}
              >
                <div
                  ref={(el) => { creatureRefs.current[c.id] = el }}
                  className="ocean-creature-inner"
                >
                  <FishSchoolSvg className="ocean-svg ocean-svg--school" />
                </div>
              </div>
            )
          }

          return null
        })}

        {/* Rising Ocean Air Bubbles */}
        {oceanBubbles.map((b) => (
          <div
            key={b.id}
            className="ocean-bubble-wrap"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              '--wobble': `${b.wobble}px`,
              '--bubble-opacity': b.opacity,
            }}
          >
            <div
              ref={(el) => { bubbleRefs.current[b.id] = el }}
              className="ocean-bubble-inner"
              style={{
                width: `${b.size}px`,
                height: `${b.size}px`,
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  if (theme === 'baba') {
    return (
      <div className="floating-layer floating-layer--baba" aria-hidden="true">
        <div className="baba-aura-glow" />
        {babaElements.map((el) => (
          <div
            key={el.id}
            className="floating-baba-item"
            style={{
              left: el.left,
              top: el.top,
              width: `${el.size}px`,
              height: `${el.size}px`,
              opacity: el.opacity,
              animationDuration: `${el.duration}s`,
              animationDelay: `${el.delay}s`,
              '--drift-y': `${el.driftDistance}px`,
            }}
          >
            {el.type === 'om' ? (
              <OmSvg className="baba-svg baba-svg--om" />
            ) : (
              <SwastikSvg className="baba-svg baba-svg--swastik" />
            )}
          </div>
        ))}
      </div>
    )
  }

  if (theme === 'robotic') {
    return (
      <div className="floating-layer floating-layer--robotic" aria-hidden="true">
        <div className="robotic-grid-overlay" />
        <div className="robotic-scanline" />
        {roboticElements.map((el) => (
          <div
            key={el.id}
            className={`floating-robot-item floating-robot-item--${el.type}`}
            style={{
              left: el.left,
              top: el.top,
              width: `${el.size}px`,
              height: `${el.size}px`,
              opacity: el.opacity,
              animationDuration: `${el.duration}s`,
              animationDelay: `${el.delay}s`,
            }}
          >
            {el.type === 'robot' && <RobotHeadSvg className="robot-svg robot-svg--head" />}
            {el.type === 'gear' && <GearSvg className="robot-svg robot-svg--gear" />}
            {el.type === 'chip' && <ChipSvg className="robot-svg robot-svg--chip" />}
            {el.type === 'hex' && <HexNodeSvg className="robot-svg robot-svg--hex" />}
          </div>
        ))}
      </div>
    )
  }

  // Emerald Classic theme
  return (
    <div className={`floating-layer floating-layer--${theme}`} aria-hidden="true">
      <div className="ambient-mesh-glow" />
    </div>
  )
}
