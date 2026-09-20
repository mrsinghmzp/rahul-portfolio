import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

const fadeUp = {
  hidden:  { y: 50, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}

function MagneticBtn({ href, children, className }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  return (
    <a ref={ref} href={href} className={`magnetic-btn ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <span>{children}</span>
    </a>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-label-col"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="section-label">About</span>
          </motion.div>

          <div className="about-content-col">
            <motion.p
              className="about-intro"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
            >
              Helping businesses build <em>scalable, production-ready</em> applications
              that solve real-world problems — from mobile to web.
            </motion.p>

            <motion.p
              className="about-body"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.25 }}
            >
              I'm a Computer Science Engineer and Full Stack &amp; Mobile Application
              Developer with hands-on experience building web and mobile applications
              using Java, React, React Native, Node.js, Express.js, MySQL, and
              MongoDB. I enjoy turning ideas into practical products, designing REST
              APIs, integrating databases, and building responsive user experiences.
              I'm currently focused on strengthening my software engineering skills
              and building production-ready applications.
            </motion.p>

            <motion.div
              className="about-stats"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.35 }}
            >
              {[
                { value: '5+', label: 'Projects Built' },
                { value: '4+', label: 'Tech Stacks' },
                { value: '2+', label: 'Years Coding' },
              ].map(s => (
                <div key={s.label} className="about-stat">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.45 }}
            >
              <MagneticBtn href="#contact" className="magnetic-btn--outline">
                Get in touch ↗
              </MagneticBtn>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
