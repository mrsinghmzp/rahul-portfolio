import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from 'react-icons/fa'
import './Contact.css'

function MagneticBtn({ href, children, className }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }
  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic-btn ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  )
}

const SOCIALS = [
  {
    icon: <FaGithub />,
    label: 'GitHub',
    handle: '@mrsinghmzp',
    href: 'https://github.com/mrsinghmzp',
    color: '#ffffff',
  },
  {
    icon: <FaLinkedinIn />,
    label: 'LinkedIn',
    handle: 'Rahul Singh',
    href: 'https://www.linkedin.com/in/singhmzp',
    color: '#0a66c2',
  },
  {
    icon: <FaEnvelope />,
    label: 'Email',
    handle: 'rahul.cs6765@gmail.com',
    href: 'mailto:rahul.cs6765@gmail.com',
    color: '#00d68f',
  },
]

const fadeUp = (delay = 0) => ({
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay } },
})

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="contact" id="contact" ref={ref}>
      {/* SVG Wave — dark-to-darker transition */}
      <div className="contact-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="#061209" />
        </svg>
      </div>

      <div className="contact-body">
        <div className="container">

          {/* ── Headline ── */}
          <div className="contact-top">
            <motion.div
              className="contact-headline-wrap"
              variants={fadeUp(0)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <span className="section-label">Get In Touch</span>
              <h2 className="contact-title">
                Let's work<br />
                <em>together.</em>
              </h2>
              <p className="contact-sub">
                Open to full-time roles, freelance projects &amp; collaborations.
                <br />Drop a message and I'll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              className="contact-cta-wrap"
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <MagneticBtn
                href="mailto:rahul.cs6765@gmail.com"
                className="magnetic-btn--accent contact-cta"
              >
                <span>Send a Message</span>
                <FaArrowRight className="cta-icon" />
              </MagneticBtn>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div className="contact-divider" />

          {/* ── Social Cards ── */}
          <motion.div
            className="socials-grid"
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="social-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } } : {}}
                whileHover={{ y: -4 }}
              >
                <div className="social-card-icon" style={{ color: s.color, background: `${s.color}14` }}>
                  {s.icon}
                </div>
                <div className="social-card-info">
                  <span className="social-card-label">{s.label}</span>
                  <span className="social-card-handle">{s.handle}</span>
                </div>
                <div className="social-card-arrow">↗</div>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Contact Meta Row ── */}
          <motion.div
            className="contact-meta"
            variants={fadeUp(0.5)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="contact-meta-item">
              <FaMapMarkerAlt className="meta-icon" />
              <div>
                <span className="meta-label">Based in</span>
                <span className="meta-value">Pune, Maharashtra, India</span>
              </div>
            </div>
            <div className="contact-meta-item">
              <span className="avail-dot" />
              <div>
                <span className="meta-label">Availability</span>
                <span className="meta-value meta-value--green">Open to opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* ── Footer Bar ── */}
          <motion.div
            className="footer-bar"
            variants={fadeUp(0.6)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span>© 2026 Rahul Singh. All rights reserved.</span>
            <span className="footer-stack">Built with React · Vite · Framer Motion</span>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
