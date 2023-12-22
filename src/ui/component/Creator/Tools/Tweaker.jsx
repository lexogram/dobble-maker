/**
 * Tweaker.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../../api/context/Context'

const MIN_R = 5
const MAX_R = 50

export const Tweaker = ({
  cx,
  cy,
  r,
  rotation,
  offsetX,
  offsetY,
  specificScale,
  onMouseLeave,
  cardIndex,
  slotIndex
}) => {

  const { tweakImage, useSunburst } = useContext(Context)

  function startTransform({
    target,
    clientX: clickX,
    clientY: clickY
  }) {
    const action = target.classList[0] // move, rotate, resize
    const svg = target.closest("svg")

    const { left, top, width } = svg.getBoundingClientRect()
    const scale = width / 100

    // Use closure to remember the initial values of offsetX & Y
    // The rendered instance where startTransform() was called
    // will continue to send tweakImage calls, even after it has
    // been replaced by new renders.
    const startX = offsetX
    const startY = offsetY

    // Find the centre of rotation and zero angle
    const centreX = left + cx * scale
    const centreY = top  + cy * scale
    const deltaX = clickX - centreX
    const deltaY = clickY - centreY
    const zeroAngle = getAngle(deltaX, deltaY) - rotation

    const startScale = specificScale
    const assignedR = r / startScale
    const minScale = MIN_R / assignedR
    const maxScale = MAX_R / assignedR
    const zeroDelta = getDelta(deltaX, deltaY)

    // Start treating the drag
    document.body.addEventListener("mousemove", transform, false)
    document.body.addEventListener("mouseup", stopTransform, false)

    // Update the image's transform as the mouse moves
    function transform({ clientX, clientY }) {
      let deltaX = (clientX - clickX)
      let deltaY = (clientY - clickY)

      switch (action) {
        case "move":
          return move()
        case "rotate":
          return rotate()
        case "resize":
          return resize()
      }

      function move() {
        offsetX = deltaX / scale + startX
        offsetY = deltaY / scale + startY
        const type = "offset"
        const value = { offsetX, offsetY }
        tweakImage({ type, value, cardIndex, slotIndex })
      }

      function rotate() {
        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
          rotation = getAngle(clientX - centreX, clientY - centreY)
                   - zeroAngle
        }
        const type = "rotation"
        const value = rotation
        tweakImage({ type, value, cardIndex, slotIndex })
      }

      function resize() {
        const newDelta = getDelta(centreX-clientX,centreY-clientY)
        let scale = startScale * newDelta / zeroDelta
        scale = Math.max(minScale, Math.min(scale, maxScale))
        const type = "scale"
        const value = scale
        tweakImage({ type, value, cardIndex, slotIndex })
      }
    }


    function stopTransform() {
      document.body.removeEventListener("mousemove", transform, false)
      document.body.removeEventListener("mouseup",stopTransform,false)
    }
  }

  function getAngle(deltaX, deltaY) {
    let angle = Math.atan(deltaY / deltaX) * 180 / Math.PI
    if (deltaX < 0) {
      angle += 180
    }
    return angle
  }

  function getDelta(deltaX, deltaY) {
    return Math.sqrt( deltaX * deltaX + deltaY * deltaY )
  }


  const R = r // * specificScale
  const X0 = cx
  const X1 = cx - 0.001
  const Y0 = cy - R
  const R1 = R * 0.866
  const Y1 = cy - R1
  const R2 = R * 0.57735
  const Y2 = cy - R2


  return (
    <g
      className="tweaker"
      opacity="0.25"
      onMouseLeave={onMouseLeave}
      onMouseDown={startTransform}
    >
      <path
        className="resize"
        fill="#f80"
        d={`
          M ${X0} ${Y0}
          A${R} ${R} 0 1 1 ${X1} ${Y0}
          L ${X1} ${Y1}
          A${R1} ${R1} 0 1 0 ${X0} ${Y1}
        `}
        cursor="zoom-in"
      />
      { !useSunburst &&
        <path
          className="rotate"
          fill="#ff0"
          d={`
            M ${X0} ${Y1}
            A${R1} ${R1} 0 1 1 ${X1} ${Y1}

            L ${X1} ${Y2}
            A${R2} ${R2} 0 1 0 ${X0} ${Y2}
          `}
          cursor="pointer"
        />
      }
      <path
        className="move"
        fill="#8f0"
          d={`
          M ${X0} ${Y2}
          A${R2} ${R2} 0 1 1 ${X1} ${Y2}
        `}
        cursor="move"
      />
    </g>
  )
}