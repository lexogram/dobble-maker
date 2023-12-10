/**
 * Picture.jsx
 */

import React from "react";
export const Picture = ({ cx, cy, r, defId, href, rotation }) => {

  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="none"
        fill="none"
      />
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
        x={cx-r}
        y={cy-r}
        width={r * 2}
        transform={`rotate(${rotation})`}
        transform-origin={`${cx} ${cy}`}
      />
    </>
  )
}


// clip-path={`url(#${defId})`}
