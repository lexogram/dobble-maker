/**
 * Tweaker.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../../api/context/Context'


export const Tweaker = ({
  cx,
  cy,
  r,
  rotation,
  onMouseLeave,
  cardIndex,
  slotIndex
}) => {

  const { tweakImage } = useContext(Context)

  function startTransform({
    target,
    clientX: clickX,
    clientY: clickY
  }) {
    const action = target.classList[0] // move, rotate, scale
    const svg = target.closest("svg")

    const { left, top, width } = svg.getBoundingClientRect()
    const scale = width / 100

    const centreX = left + cx * scale
    const centreY = top  + cy * scale

    // Find the centre of rotation and zero angle
    const zeroAngle = getAngle(clickX - centreX, clickY - centreY)
                    - rotation

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
        case "scale-rotate":
        case "rotate":
          return rotate()
      }

      function move() {
        // translateX = deltaX * scale + startX
        // translateY = deltaY * scale + startY
        // const transform = `translate(${translateX} ${translateY})`
        // translator.setAttribute("transform", transform)
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
      onMouseDown={startTransform}
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