import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LuDownload } from 'react-icons/lu'
import profileImg from '../../assets/profile.png'
import PaperBadge from '../PaperBadge/PaperBadge' // 3D Foldable Paper Badge
import './Hero.css'

function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const ist = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
      setTime(`${ist} IST`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="hero-clock">{time}</span>
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
}

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
}

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <motion.div className="hero-content container" style={{ opacity }}>
        {/* Location Badge */}
        <motion.div
          className="location-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="globe-spin">🌏</span>
          <span>Pune, India</span>
          <span className="badge-sep">—</span>
          <Clock />
        </motion.div>

        {/* Main Title & Mobile Profile Image (Side by Side on Mobile) */}
        <div className="hero-title-image-row">
          <motion.div
            className="hero-title-wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="hero-title-line-wrap">
              <motion.h1 className="hero-title" variants={lineVariants}>
                Rahul
              </motion.h1>
            </div>
            <div className="hero-title-line-wrap">
              <motion.span className="hero-title hero-title--outline" variants={lineVariants}>
                Singh.
              </motion.span>
            </div>
          </motion.div>

          {/* Profile Image (Side by Side with Name on Mobile) */}
          <motion.div
            className="hero-image-mobile"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-image-inner">
              <img src={profileImg} alt="Rahul Singh — Full Stack Developer" className="hero-profile-img" />
              <PaperBadge />
            </div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <div className="hero-role">
            <p>Full Stack Developer</p>
            <p>& Mobile App Developer</p>
          </div>
          <p className="hero-tagline">
            Building scalable web and mobile<br />
            applications that solve real-world problems.
          </p>
          <div className="hero-cta-row">
            <a href="#work" className="hero-cta-btn">View Projects ↓</a>
            <a
              href="/Rahul_Singh_Mobiledev.pdf"
              download="Rahul_Singh_Mobiledev.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-resume"
              aria-label="Download Rahul Singh's Resume"
            >
              <LuDownload className="resume-download-icon" />
              <span>Download Resume</span>
            </a>
            <a href="#contact" className="hero-cta-ghost">Let's Talk →</a>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Image with parallax */}
      <motion.div
        className="hero-image-wrap"
        style={{ y: imgY }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-image-inner">
          <img src={profileImg} alt="Rahul Singh — Full Stack Developer" className="hero-profile-img" />
          <PaperBadge />
        </div>
      </motion.div>
    </section>
  )
}
