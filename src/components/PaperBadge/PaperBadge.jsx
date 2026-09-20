import { useState } from 'react'
import './PaperBadge.css'

export default function PaperBadge({ className = '' }) {
  const [key, setKey] = useState(0)

  const handleReplay = (e) => {
    e.stopPropagation()
    setKey((prev) => prev + 1)
  }

  return (
    <div
      key={key}
      className={`paper-badge-container ${className}`}
      onClick={handleReplay}
      title="Click to fold and unfold paper from right to left!"
    >
      {/* Translucent washi tape anchoring the right side */}
      <div className="paper-tape" />

      {/* 3D Paper Sheet with right-to-left fold/unfold animation */}
      <div className="paper-note">
        {/* Left Segment: Hinged at right, folds and unfolds from right to left */}
        <div className="paper-panel paper-panel-left">
          {/* Front Face (visible when unfolded) */}
          <div className="paper-front">
            <span className="paper-pin-dot" />
            <span className="paper-text">Let's build</span>
          </div>
          {/* Back Face (craft paper texture visible when folded over the right) */}
          <div className="paper-back" />
        </div>

        {/* 3D Vertical Crease line */}
        <div className="paper-crease" />

        {/* Right Segment: Stationary anchored base */}
        <div className="paper-panel paper-panel-right">
          <span className="paper-text">together</span>
          {/* Folded paper dog-ear corner */}
          <div className="paper-dogear" />
        </div>
      </div>
    </div>
  )
}
