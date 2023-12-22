/**
 * Picture.jsx
 */

import React, { useState } from "react";
import { Tweaker } from "./Tools/Tweaker";



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
  crop,
  isPreview
}) => {
  // Define dimensions of crop-circle
  cx += offset
  cy += offset
  scale *= r
  const circle = { cx, cy, r }
  const origin = `${cx} ${cy}`

  // Define dimensions of square image
  const x = cx - scale
  const y = cy - scale
  const width = scale* 2
  const square = { x, y, width }


  const [ showTweaker, setShowTweaker ] = useState(false)

  const toggleTweaker = ({ type }) => {
    setShowTweaker(type === "mouseenter")
  }

  // Create a clipPath prop that can be ignored if unneeded
  const cropPath = crop ? { clipPath: `url(#${defId})` } : {}


  return (
    <g>
      <defs>
        <clipPath
          id={defId}
        >
          <circle
            {...circle}
          />
        </clipPath>
      </defs>
      <image
        href={href}
        {...square}
        {...cropPath}
        transform={`rotate(${rotation})`}
        transform-origin={origin}
      />
      { !isPreview &&
      <circle
        className="crop-circle"
        {...circle}
        fill={fill}
        opacity={.05}
        onMouseEnter={toggleTweaker}
      />}
      { showTweaker && <Tweaker 
        {...circle}
        onMouseLeave={toggleTweaker}
      />}
    </g>
  )
}


// clip-path={`url(#${defId})`}