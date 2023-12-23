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
  tweaks,
  rotation,
  fill,
  offset=0,
  crop,
  isPreview,
  indices,
  ratio
}) => {
  // Define dimensions of crop-circle
  cx += offset + (tweaks.offsetX * ratio)
  cy += offset + (tweaks.offsetY * ratio)

  const circle = { cx, cy, r }
  const origin = `${cx} ${cy}`

  // Define dimensions of square image
  const x = cx - r
  const y = cy - r
  const width = r * 2
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
        onMouseEnter={toggleTweaker}
      />}
      { showTweaker && <Tweaker 
        {...circle}
        {...indices}
        {...tweaks}
        onMouseLeave={toggleTweaker}
      />}
    </g>
  )
}


// clip-path={`url(#${defId})`}