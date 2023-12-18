/**
 * Picture.jsx
 */

import React from "react";
export const Picture = ({ cx, cy, r, defId, href, rotation, fill, offset=0}) => {
  cx += offset
  cy += offset
  const scale = r // * 0.82 // for gecko

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
        // clipPath={`url(#${defId})`}
      />
      {/* Temporary display of clip-path */}
      <circle
        className="temp"
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        opacity={.05}
      /> {/* */}
    </g>
  )
}


// clip-path={`url(#${defId})`}