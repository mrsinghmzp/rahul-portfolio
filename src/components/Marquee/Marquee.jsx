import './Marquee.css'

const ITEMS = [
  'React', 'React Native', 'Node.js', 'Spring Boot',
  'MongoDB', 'MySQL', 'Java', 'JavaScript', 'Python',
  'REST APIs', 'Express.js', 'JWT Auth'
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee-section">
      {/* Forward */}
      <div className="marquee-row">
        <div className="marquee-track marquee-track--fwd">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>
      {/* Reverse */}
      <div className="marquee-row marquee-row--rev">
        <div className="marquee-track marquee-track--rev">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
