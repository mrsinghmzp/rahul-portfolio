import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LuSmartphone, LuGlobe, LuServer } from 'react-icons/lu'
import {
  FaJava,
  FaPython,
  FaDatabase,
  FaReact,
  FaNodeJs,
  FaGitAlt,
} from 'react-icons/fa'
import {
  SiJavascript,
  SiSpringboot,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiCloudinary,
  SiPostman,
  SiVercel,
  SiExpo,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'
import './Services.css'

const SERVICES = [
  {
    icon: <LuSmartphone />,
    title: 'Mobile Development',
    desc: 'Building cross-platform mobile apps with React Native — from authentication to cloud storage, native device APIs, and smooth offline-first UX.',
    tags: ['React Native', 'Android', 'Expo', 'SQLite', 'Room DB'],
  },
  {
    icon: <LuGlobe />,
    title: 'Full Stack Web',
    desc: 'End-to-end web application development from responsive React front-ends to robust Node.js back-ends, deployed on modern cloud platforms.',
    tags: ['React.js', 'Node.js', 'Express.js', 'Vercel', 'Render'],
  },
  {
    icon: <LuServer />,
    title: 'Backend & APIs',
    desc: 'Designing RESTful APIs, managing relational & NoSQL databases, JWT authentication systems, and server-side logic with Java & Node.js.',
    tags: ['Spring Boot', 'JWT', 'MySQL', 'MongoDB', 'JPA'],
  },
]

const STACK = [
  { name: 'Java', icon: <FaJava /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'SQL', icon: <FaDatabase /> },
  { name: 'React.js', icon: <FaReact /> },
  { name: 'React Native', icon: <TbBrandReactNative /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Spring Boot', icon: <SiSpringboot /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Git & GitHub', icon: <FaGitAlt /> },
  { name: 'Cloudinary', icon: <SiCloudinary /> },
  { name: 'Postman', icon: <SiPostman /> },
  { name: 'Vercel', icon: <SiVercel /> },
  { name: 'Expo', icon: <SiExpo /> },
]

const fadeUp = (delay = 0) => ({
  hidden:  { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay } }
})

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <motion.span
          className="section-label"
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          What I Do
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Services & Skills
        </motion.h2>

        {/* Service Cards */}
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="service-card"
              variants={fadeUp(0.1 + i * 0.12)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="service-icon-wrap">
                <span className="service-icon">{s.icon}</span>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map(t => (
                  <span key={t} className="service-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Pill Grid */}
        <motion.div
          className="stack-section"
          variants={fadeUp(0.5)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <p className="stack-label">Full Tech Stack</p>
          <div className="stack-grid">
            {STACK.map((item, i) => (
              <motion.span
                key={item.name}
                className="stack-pill"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1, transition: { delay: 0.4 + i * 0.04 } } : {}}
              >
                <span className="stack-pill-icon">{item.icon}</span>
                <span>{item.name}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
