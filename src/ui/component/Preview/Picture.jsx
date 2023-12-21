/**
 * Picture.jsx
 */

import React from "react";
export const Picture = ({
  cx,
  cy,
  r,
  defId,
  href,
  rotation,
  fill,
  offset=0,
  scale,
  crop
}) => {
  cx += offset
  cy += offset
  scale *= r

  const clipPath = crop ? `url(#${defId})` : ""

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
        clipPath={clipPath}
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