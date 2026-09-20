import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaLock, FaExternalLinkAlt } from 'react-icons/fa'
import krantiImg from '../../assets/projects/kranti-app.png'
import cityImg from '../../assets/projects/city-connect.jpg'
import vindhyaImg from '../../assets/projects/vindhya-almirah.png'
import resumeImg from '../../assets/projects/resume-analyzer.jpg'
import lmsImg from '../../assets/projects/lms-app.jpg'
import './Work.css'

const PROJECTS = [
  {
    num: '01',
    title: 'Kranti App',
    category: 'Mobile Application / Full Stack',
    year: '2026',
    url: 'https://play.google.com/store/apps/details?id=com.kranti.app&hl=en_IN&pli=1',
    displayUrl: 'play.google.com/store/apps/kranti',
    image: krantiImg,
    color: '#1a3a2a',
    accent: '#22c55e',
    desc: 'React Native · Node.js · MongoDB · Cloudinary',
  },
  {
    num: '02',
    title: 'CityConnect',
    category: 'Full Stack Web & Mobile',
    year: '2026',
    url: 'https://github.com/mrsinghmzp/City-connect-backend',
    displayUrl: 'github.com/mrsinghmzp/City-connect-backend',
    image: cityImg,
    color: '#0f1f3d',
    accent: '#3b82f6',
    desc: 'React Native · React.js · Node.js · MySQL · JWT',
  },
  {
    num: '03',
    title: 'Vindhya Almirah',
    category: 'Business Website',
    year: '2026',
    url: 'https://www.vindhyaalmirah.com/',
    displayUrl: 'vindhyaalmirah.com',
    image: vindhyaImg,
    color: '#0a2a2a',
    accent: '#14b8a6',
    desc: 'React.js · Node.js · Express.js · Responsive Design',
  },
  {
    num: '04',
    title: 'AI Resume Analyzer',
    category: 'AI / Web Application',
    year: '2026',
    url: 'https://github.com/mrsinghmzp/AI-Resume-Analyzer',
    displayUrl: 'github.com/mrsinghmzp/AI-Resume-Analyzer',
    image: resumeImg,
    color: '#1f0a3d',
    accent: '#a855f7',
    desc: 'Python · Streamlit · Ollama · Llama · ChromaDB',
  },
  {
    num: '05',
    title: 'LMS Web Application',
    category: 'Web Application',
    year: '2025–2026',
    url: 'https://github.com/mrsinghmzp/Library-Management-System',
    displayUrl: 'github.com/mrsinghmzp/Library-Management-System',
    image: lmsImg,
    color: '#2a1a00',
    accent: '#f59e0b',
    desc: 'React.js · Node.js · Express.js · MySQL',
  },
]

const fadeUp = (delay = 0) => ({
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } }
})

export default function Work() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 })
  const previewRef = useRef(null)
  const rafRef = useRef(null)
  const targetPos = useRef({ x: 0, y: 0 })

  const lerp = (a, b, t) => a + (b - a) * t

  const animatePreview = useCallback(() => {
    setPreviewPos(prev => ({
      x: lerp(prev.x, targetPos.current.x, 0.15),
      y: lerp(prev.y, targetPos.current.y, 0.15),
    }))
    rafRef.current = requestAnimationFrame(animatePreview)
  }, [])

  const handleMouseEnter = (index, e) => {
    setHoveredIndex(index)
    if (e) {
      targetPos.current = { x: e.clientX, y: e.clientY }
      setPreviewPos({ x: e.clientX, y: e.clientY })
    }
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animatePreview)
    }
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const handleMouseMove = (e) => {
    targetPos.current = { x: e.clientX, y: e.clientY }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const activeProject = hoveredIndex !== null ? PROJECTS[hoveredIndex] : null

  // Ensure preview card stays nicely within viewport
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const clampedX = Math.max(190, Math.min(viewportWidth - 190, previewPos.x))
  const isNearTop = previewPos.y < 320

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="container">
        <div className="work-header">
          <motion.span
            className="section-label"
            variants={fadeUp(0)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            Selected Work
          </motion.span>
          <motion.h2
            className="section-title"
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            Recent Projects
          </motion.h2>
        </div>

        {/* Project List */}
        <div className="projects-list" onMouseMove={handleMouseMove}>
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.num}
              href={p.url}
              target={p.url !== '#' ? '_blank' : undefined}
              rel={p.url !== '#' ? 'noreferrer noopener' : undefined}
              className={`project-item ${hoveredIndex === i ? 'project-item--active' : ''} ${hoveredIndex !== null && hoveredIndex !== i ? 'project-item--dimmed' : ''}`}
              variants={fadeUp(0.05 * i)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              onMouseEnter={(e) => handleMouseEnter(i, e)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="project-num">{p.num}</span>
              <div className="project-info">
                <h3 className="project-title">{p.title}</h3>
                <span className="project-stack">{p.desc}</span>
              </div>
              <span className="project-cat">{p.category}</span>
              <span className="project-year">{p.year}</span>
              <span className="project-arrow">↗</span>
            </motion.a>
          ))}
        </div>

        {/* Floating Link Preview Card */}
        <AnimatePresence>
          {activeProject && (
            <div
              ref={previewRef}
              className="project-preview-wrap"
              style={{
                left: clampedX,
                top: previewPos.y,
                transform: isNearTop ? 'translate(-50%, 25px)' : 'translate(-50%, -105%)',
              }}
            >
              <motion.div
                className="preview-card"
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderColor: `${activeProject.accent}55`,
                  boxShadow: `0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px ${activeProject.accent}25`,
                }}
              >
                {/* Browser Top Bar */}
                <div className="preview-browser-bar">
                  <div className="preview-traffic-dots">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                  </div>
                  <div className="preview-url-pill">
                    <FaLock className="preview-lock-icon" />
                    <span className="preview-url-text">{activeProject.displayUrl}</span>
                  </div>
                  <div className="preview-live-badge">
                    <span
                      className="preview-live-pulse"
                      style={{ backgroundColor: activeProject.accent, color: activeProject.accent }}
                    />
                    <span>PREVIEW</span>
                  </div>
                </div>

                {/* Screenshot Viewport */}
                <div className="preview-image-container">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="preview-screenshot"
                  />
                  <div className="preview-image-gradient" />
                </div>

                {/* Bottom Details Bar */}
                <div className="preview-bottom-bar">
                  <div className="preview-meta">
                    <div className="preview-title-wrap">
                      <span className="preview-title-text">{activeProject.title}</span>
                      <span
                        className="preview-category-tag"
                        style={{
                          color: activeProject.accent,
                          backgroundColor: `${activeProject.accent}18`,
                          borderColor: `${activeProject.accent}44`,
                        }}
                      >
                        {activeProject.category.split('/')[0].trim()}
                      </span>
                    </div>
                    <span className="preview-desc-text">{activeProject.desc}</span>
                  </div>

                  <div
                    className="preview-action-btn"
                    style={{
                      backgroundColor: activeProject.accent,
                    }}
                  >
                    <span>Visit</span>
                    <FaExternalLinkAlt className="preview-btn-icon" />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* More Work Button */}
        <motion.div
          className="work-footer"
          variants={fadeUp(0.4)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <a href="https://github.com/mrsinghmzp" target="_blank" rel="noreferrer" className="magnetic-btn magnetic-btn--outline">
            <span>More on GitHub ↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
