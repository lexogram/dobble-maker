/**
 * Tweaker.jsx
 */


import React from 'react'


export const Tweaker = ({ cx, cy, r, onMouseLeave}) => {
  const X0 = cx
  const X1 = cx - 0.001
  const Y0 = cy - r
  const R1 = r * Math.cos(Math.PI / 6)
  const Y1 = cy - R1
  const R2 = r * Math.sqrt(0.5)
  const Y2 = cy - R2
  const R3 = r * 0.5
  const Y3 = cy - R3

  return (
    <g
      className="tweaker"
      opacity="0.25"
      onMouseLeave={onMouseLeave}
    >
      <path
        className="scale"
        fill="#f00"
        d={`
          M ${X0} ${Y0}
          A${r} ${r} 0 1 1 ${X1} ${Y0}
          L ${X1} ${Y1}
          A${R1} ${R1} 0 1 0 ${X0} ${Y1}
        `}
      />
      <path
        className="scale-rotate"
        fill="#f80"
        d={`
          M ${X0} ${Y1}
          A${R1} ${R1} 0 1 1 ${X1} ${Y1}

          L ${X1} ${Y2}
          A${R2} ${R2} 0 1 0 ${X0} ${Y2}
        `}
      />
      <path
        className="rotate"
        fill="#ff0"
        d={`
          M ${X0} ${Y2}
          A${R2} ${R2} 0 1 1 ${X1} ${Y2}

          L ${X1} ${Y3}
          A${R3} ${R3} 0 1 0 ${X0} ${Y3}
        `}
      />
      <path
        className="move"
        fill="#0f0"
        d={`
          M ${X1} ${Y3}
          A${R3} ${R3} 0 1 0 ${X0} ${Y3}
        `}
      />
    </g>
  )
}