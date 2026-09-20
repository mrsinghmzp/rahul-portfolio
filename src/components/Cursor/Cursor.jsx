import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const moveCursor = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const lerp = (start, end, t) => start + (end - start) * t

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onHover = () => {
      ringRef.current?.classList.add('cursor-ring--hover')
      dotRef.current?.classList.add('cursor-dot--hover')
    }
    const onLeave = () => {
      ringRef.current?.classList.remove('cursor-ring--hover')
      dotRef.current?.classList.remove('cursor-dot--hover')
    }

    document.addEventListener('mousemove', moveCursor, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    const hoverEls = document.querySelectorAll('a, button, .project-item, .magnetic-btn')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onHover)
      el.addEventListener('mouseleave', onLeave)
    })

    // Watch for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .project-item, .magnetic-btn').forEach(el => {
        el.removeEventListener('mouseenter', onHover)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onHover)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
