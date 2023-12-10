/**
 * Picture.jsx
 */

import React from "react";
export const Picture = ({ cx, cy, r, defId, href, rotation, fill }) => {
  const scale = r // * 0.8ƒ

  return (
    <g>
      <defs>
        <clipPath
          id={defId}
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
          />
        </clipPath>
      </defs>
      <image
        href={href}
        x={cx-scale}
        y={cy-scale}
        width={scale * 2}
        transform={`rotate(${rotation})`}
        transform-origin={`${cx} ${cy}`}
        clipPath={`url(#${defId})`}
      />
      {/* Temporary display of clip-path */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        opacity={.1}
      />
    </g>
  )
}


// clip-path={`url(#${defId})`}