
import React, { useContext, useState } from 'react'
import { Context } from '../../../../api/context/Context'

const MIN_R = 5
const MAX_R = 50
const fill = "#0001"
const HOVER = "#000"
const PATTERN = "url(#check)"
const CROP_CIRCLE = {
  stroke: "#fff",
  strokeWidth: "0.5",
  fill: "none"
}
const UNCROP_RECT = {
  stroke: "#000",
  strokeWidth: "0.5",
  fill: "none"
}
const NO_STROKE = { stroke: "none", fill: "none" }
const WHITE_ARROWS = { fill: "#fff"}


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

  const [ cropping, setCropping ] = useState(false)
  // Use `let` to set the styleFor state, because a mouseleave
  // event from one element and a mouseenter event from another
  // element may both occur before React updates the state. It
  // is therefore necessary to update the stylesFor state
  // _locally_ after the mouseleave event so that it is in the
  // correct state _locally_ when the mouseenter event is
  // triggered.
  // Without this the `.crop` elements might not lose their
  // hover state when the mouse moved on to another SVG element.
  let [ styleFor, setStyleFor ] = useState({
    move:   { fill },
    rotate: { fill },
    resize: { fill },
    crop:   { fill },
    rect:   NO_STROKE,
    circle: NO_STROKE
  })


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


  // SET UP FOR SVG // SET UP FOR SVG // SET UP FOR SVG //

  const R = r // * specificScale
  const X0 = cx
  const X1 = cx - 0.001
  const Y0 = cy - R
  const R1 = R * 0.75 // 0.866 //
  const Y1 = cy - R1
  const R2 = R * 0.45 // 0.57735 //
  const Y2 = cy - R2

  // Translate arrows
  const t1 = R / 50
  const t2 = 3 * t1
  const t3 = R2 - t2 * 1.75
  const t4 = R2

  // Rotate arrows: angles
  const ra1 = 22.5 * Math.PI / 180
  const rb = 10
  const ra2 = ra1 + rb * Math.PI / 180
  // radii
  const rr3 = (R1  + R2 ) / 2 // 28.867
  const rr1 = (rr3 + R2 ) / 2
  const rr5 = (rr3 + R1 ) / 2

  const ratioIn = 0.97 // 3% in
  const deltaIn = rr3 * (1 - ratioIn)
  const rr2 = rr3 * ratioIn
  const rr4 = rr3 + deltaIn

  // points: tip of arrow
  const r1 = rr3 * Math.cos(ra1)
  const r2 = rr3 * Math.sin(ra1)
  // inner barb
  const r3 = rr1 * Math.cos(ra2)
  const r4 = rr1 * Math.sin(ra2)
  const r5 = rr2 * Math.cos(ra2)
  const r6 = rr2 * Math.sin(ra2)
  // inner tail
  const r7 = rr2 * Math.sin(ra1)
  const r8 = rr2 * Math.cos(ra1)
  // outer tail
  const r9 = rr4 * Math.sin(ra1)
  const rA = rr4 * Math.cos(ra1)
  // outer barb
  const rB = rr4 * Math.cos(ra2)
  const rC = rr4 * Math.sin(ra2)
  const rD = rr5 * Math.cos(ra2)
  const rE = rr5 * Math.sin(ra2)

  // Scale arrows
  const sa1 = 3 * Math.PI / 180
  const s45 = 45 * Math.PI / 180
  const s1 = R1 * Math.cos(sa1)
  const s2 = R1 * Math.sin(sa1)
  const s3 = R1 * Math.cos(s45)
  const s4 = R  * Math.cos(s45 + sa1)
  const s5 = R  * Math.sin(s45 + sa1)

  // Crop pattern
  const percent = 50 / r + "%"


  const getCropStyles = (isMouseEnter, cropping) => {
    if (isMouseEnter) {
      return cropping
        ? { crop:   { fill: HOVER },
            rect:   NO_STROKE,
            circle: CROP_CIRCLE
          }
        : { crop:   { fill: PATTERN },
            rect:   UNCROP_RECT,
            circle: NO_STROKE
          }
    } else {
      return {
        crop:   { fill },
        rect:   NO_STROKE,
        circle: NO_STROKE
      }
    }
  }


  const toggleFill = ({ target, type }) => {
    const isMouseEnter = type === "mouseenter"
    const className = target.classList[0]

    if (className === "crop") {
      const cropStyles = getCropStyles(isMouseEnter, cropping)
      // Update stylesFor _locally_ because a mouseenter event may
      // be triggered on another SVG element before React has had
      // time to update the state internally.
      styleFor = { ...styleFor, ...cropStyles }

    } else if (isMouseEnter) { // for move, rotate, scale
        styleFor[className] = { fill: HOVER }
        styleFor[className+"Arrows"] = WHITE_ARROWS

    } else { // mouseleave for move, rotate, scale
      styleFor[className] = { fill }
      styleFor[className+"Arrows"] = NO_STROKE
    }

    setStyleFor({ ...styleFor })
  }


  const toggleCrop = () => {
    setCropping(!cropping)
    const cropStyles = getCropStyles(true, !cropping)
    setStyleFor({ ...styleFor, ...cropStyles })
  }


  return (
    <g
      className="tweaker"
      opacity="0.5"
      onMouseLeave={onMouseLeave}
      onMouseDown={startTransform}
    >
      <defs>
        <pattern
          id="check"
          width={percent}
          height={percent}
          viewBox="0 0 10 10"
        >
          <g
            opacity="0.5"
          >
            <rect
              className="crop"
              x="0"
              y="0"
              width="5"
              height="5"
              fill="black"
            />
            <rect
              className="crop"
              x="5"
              y="5"
              width="5"
              height="5"
              fill="black"
            />
            <rect
              className="crop"
              x="5"
              y="0"
              width="5"
              height="5"
              fill="white"
            />
            <rect
              className="crop"
              x="0"
              y="5"
              width="5"
              height="5"
              fill="white"
            />
          </g>
        </pattern>
      </defs>

      <g
        className="tweaker"
        // onMouseDown={startTransform}
        cursor="pointer"
      >
        <g
          transform-origin={`${cx} ${cy}`}
          transform={`rotate(${rotation})`}
          onMouseEnter={toggleFill}
          onMouseLeave={toggleFill}
          onMouseUp={toggleCrop}
        >
          <path
            className="crop"
            style={styleFor.crop}
            d={`
              M ${X0}     ${Y0}
              L ${X0 + R} ${Y0}
              L ${X0 + R} ${cy + R}
              L ${X0 - R} ${cy + R}
              L ${X0 - R} ${Y0}
              Z
              M ${X1}     ${Y0}
              A${R} ${R} 0 1 0 ${X0} ${Y0}
              Z
            `}
          />
          <rect
            className="crop"
            x={X0 - R}
            y={Y0}
            width={2 * R}
            height={2 * R}
            style={styleFor.rect}
          />
          <circle
            className="crop"
            cx={cx}
            cy={cy}
            r={r}
            style={styleFor.circle}
          />
        </g>

        <g>
          <path
            style={styleFor.resize}
            d={`
              M ${X0} ${Y0}
              A${R} ${R} 0 1 1 ${X1} ${Y0}
              M ${X1} ${Y1}
              A${R1} ${R1} 0 1 0 ${X0} ${Y1}
              M ${X0 + R} ${cy}
              L ${X0 + s1} ${cy - s2}
              A ${R1} ${R1} 0 0 1 ${X0 + s1} ${cy + s2}
              Z
              M ${X0 + s3} ${cy + s3}
              L ${X0 + s4} ${cy + s5}
              A ${R} ${R} 0 0 0 ${X0 + s5} ${cy + s4}
              Z
              M ${X0}      ${cy + R}
              L ${X0 + s2} ${cy + s1}
              A ${R1} ${R1} 0 0 1 ${X0 - s2} ${cy + s1}
              Z
              M ${X0 - s3} ${cy + s3}
              L ${X0 - s5} ${cy + s4}
              A ${R} ${R} 0 0 0 ${X0 - s4} ${cy + s5}
              Z
              M ${X0 - R} ${cy}
              L ${X0 - s1} ${cy + s2}
              A ${R1} ${R1} 0 0 1 ${X0 - s1} ${cy - s2}
              Z
              M ${X0 - s3} ${cy - s3}
              L ${X0 - s4} ${cy - s5}
              A ${R} ${R} 0 0 0 ${X0 - s5} ${cy - s4}
              Z
              M ${X0}      ${cy - R}
              L ${X0 - s2} ${cy - s1}
              A ${R1} ${R1} 0 0 1 ${X0 + s2} ${cy - s1}
              Z
              M ${X0 + s3} ${cy - s3}
              L ${X0 + s5} ${cy - s4}
              A ${R} ${R} 0 0 0 ${X0 + s4} ${cy - s5}
              Z
            `}
          />
          <path
            style={styleFor.resizeArrows}
            d={`
              M ${X0 + R} ${cy}
              L ${X0 + s1} ${cy - s2}
              A ${R1} ${R1} 0 0 1 ${X0 + s1} ${cy + s2}
              Z
              M ${X0 + s3} ${cy + s3}
              L ${X0 + s4} ${cy + s5}
              A ${R} ${R} 0 0 0 ${X0 + s5} ${cy + s4}
              Z
              M ${X0}      ${cy + R}
              L ${X0 + s2} ${cy + s1}
              A ${R1} ${R1} 0 0 1 ${X0 - s2} ${cy + s1}
              Z
              M ${X0 - s3} ${cy + s3}
              L ${X0 - s5} ${cy + s4}
              A ${R} ${R} 0 0 0 ${X0 - s4} ${cy + s5}
              Z
              M ${X0 - R} ${cy}
              L ${X0 - s1} ${cy + s2}
              A ${R1} ${R1} 0 0 1 ${X0 - s1} ${cy - s2}
              Z
              M ${X0 - s3} ${cy - s3}
              L ${X0 - s4} ${cy - s5}
              A ${R} ${R} 0 0 0 ${X0 - s5} ${cy - s4}
              Z
              M ${X0}      ${cy - R}
              L ${X0 - s2} ${cy - s1}
              A ${R1} ${R1} 0 0 1 ${X0 + s2} ${cy - s1}
              Z
              M ${X0 + s3} ${cy - s3}
              L ${X0 + s5} ${cy - s4}
              A ${R} ${R} 0 0 0 ${X0 + s4} ${cy - s5}
              Z
            `}
          />
          <path
            className="resize"
            onMouseEnter={toggleFill}
            onMouseLeave={toggleFill}
            fill="#0000" // must have a fill to trigger events
            d={`
              M ${X0} ${Y0}
              A${R} ${R} 0 1 1 ${X1} ${Y0}
              M ${X1} ${Y1}
              A${R1} ${R1} 0 1 0 ${X0} ${Y1}
            `}
          />
        </g>

        { !useSunburst && <g
          transform-origin={`${cx} ${cy}`}
          transform={`rotate(${rotation})`}
        >
          <path
            style={styleFor.rotate}
            d={`
              M ${X0} ${Y1}
              A ${R1} ${R1} 0 1 1 ${X1} ${Y1}
              M ${X1} ${Y2}
              A ${R2} ${R2} 0 1 0 ${X0} ${Y2}

              M ${X0 + r1} ${cy + r2}
              L ${X0 + r3} ${cy + r4}
              L ${X0 + r5} ${cy + r6}
              A ${rr2} ${rr2} 0 0 1 ${X0 + r7} ${cy + r8}
              L ${X0 + r9} ${cy + rA}
              A ${rr4} ${rr4} 0 0 0 ${X0 + rB} ${cy + rC}
              L ${X0 + rD} ${cy + rE}
              Z
              M ${X0 - r1} ${cy + r2}
              L ${X0 - rD} ${cy + rE}
              L ${X0 - rB} ${cy + rC}
              A ${rr4} ${rr4} 0 0 0 ${X0 - r9} ${cy + rA}
              L ${X0 - r7} ${cy + r8}
              A ${rr2} ${rr2} 0 0 1 ${X0 - r5} ${cy + r6}
              L ${X0 - r3} ${cy + r4}
              Z

              M ${X0 - r1} ${cy - r2}
              L ${X0 - r3} ${cy - r4}
              L ${X0 - r5} ${cy - r6}
              A ${rr2} ${rr2} 0 0 1 ${X0 - r7} ${cy - r8}
              L ${X0 - r9} ${cy - rA}
              A ${rr4} ${rr4} 0 0 0 ${X0 - rB} ${cy - rC}
              L ${X0 - rD} ${cy - rE}
              Z
              M ${X0 + r1} ${cy - r2}
              L ${X0 + rD} ${cy - rE}
              L ${X0 + rB} ${cy - rC}
              A ${rr4} ${rr4} 0 0 0 ${X0 + r9} ${cy - rA}
              L ${X0 + r7} ${cy - r8}
              A ${rr2} ${rr2} 0 0 1 ${X0 + r5} ${cy - r6}
              L ${X0 + r3} ${cy - r4}
              Z
            `}
          />
          <path
            style={styleFor.rotateArrows}
            d={`
              M ${X0 + r1} ${cy + r2}
              L ${X0 + r3} ${cy + r4}
              L ${X0 + r5} ${cy + r6}
              A ${rr2} ${rr2} 0 0 1 ${X0 + r7} ${cy + r8}
              L ${X0 + r9} ${cy + rA}
              A ${rr4} ${rr4} 0 0 0 ${X0 + rB} ${cy + rC}
              L ${X0 + rD} ${cy + rE}
              Z
              M ${X0 - r1} ${cy + r2}
              L ${X0 - rD} ${cy + rE}
              L ${X0 - rB} ${cy + rC}
              A ${rr4} ${rr4} 0 0 0 ${X0 - r9} ${cy + rA}
              L ${X0 - r7} ${cy + r8}
              A ${rr2} ${rr2} 0 0 1 ${X0 - r5} ${cy + r6}
              L ${X0 - r3} ${cy + r4}
              Z

              M ${X0 - r1} ${cy - r2}
              L ${X0 - r3} ${cy - r4}
              L ${X0 - r5} ${cy - r6}
              A ${rr2} ${rr2} 0 0 1 ${X0 - r7} ${cy - r8}
              L ${X0 - r9} ${cy - rA}
              A ${rr4} ${rr4} 0 0 0 ${X0 - rB} ${cy - rC}
              L ${X0 - rD} ${cy - rE}
              Z
              M ${X0 + r1} ${cy - r2}
              L ${X0 + rD} ${cy - rE}
              L ${X0 + rB} ${cy - rC}
              A ${rr4} ${rr4} 0 0 0 ${X0 + r9} ${cy - rA}
              L ${X0 + r7} ${cy - r8}
              A ${rr2} ${rr2} 0 0 1 ${X0 + r5} ${cy - r6}
              L ${X0 + r3} ${cy - r4}
              Z
            `}
          />
          <path
            className="rotate"
            onMouseEnter={toggleFill}
            onMouseLeave={toggleFill}
            fill="#0000"
            d={`
              M ${X0} ${Y1}
              A ${R1} ${R1} 0 1 1 ${X1} ${Y1}
              M ${X1} ${Y2}
              A${R2} ${R2} 0 1 0 ${X0} ${Y2}
            `}
          />
        </g> }

        <g>
          <path
            style={styleFor.move}
            d={`
              M ${X0} ${Y2}
              A${R2} ${R2} 0 1 1 ${X1} ${Y2}
              M ${X0 + t1} ${cy + t1}
              L ${X0 + t3} ${cy + t1}
              L ${X0 + t3} ${cy + t2}
              L ${X0 + t4} ${cy}
              L ${X0 + t3} ${cy - t2}
              L ${X0 + t3} ${cy - t1}
              L ${X0 + t1} ${cy - t1}
              L ${X0 + t1} ${cy - t3}
              L ${X0 + t2} ${cy - t3}
              L ${X0}     ${cy - t4}
              L ${X0 - t2} ${cy - t3}
              L ${X0 - t1} ${cy - t3}
              L ${X0 - t1} ${cy - t1}
              L ${X0 - t3} ${cy - t1}
              L ${X0 - t3} ${cy - t2}
              L ${X0 - t4} ${cy}
              L ${X0 - t3} ${cy + t2}
              L ${X0 - t3} ${cy + t1}
              L ${X0 - t1} ${cy + t1}
              L ${X0 - t1} ${cy + t3}
              L ${X0 - t2} ${cy + t3}
              L ${X0}      ${cy + t4}
              L ${X0 + t2} ${cy + t3}
              L ${X0 + t1} ${cy + t3}
              Z
            `}
          />
          <path
            style={styleFor.moveArrows}
            d={`
              M ${X0 + t1} ${cy + t1}
              L ${X0 + t3} ${cy + t1}
              L ${X0 + t3} ${cy + t2}
              L ${X0 + t4} ${cy}
              L ${X0 + t3} ${cy - t2}
              L ${X0 + t3} ${cy - t1}
              L ${X0 + t1} ${cy - t1}
              L ${X0 + t1} ${cy - t3}
              L ${X0 + t2} ${cy - t3}
              L ${X0}     ${cy - t4}
              L ${X0 - t2} ${cy - t3}
              L ${X0 - t1} ${cy - t3}
              L ${X0 - t1} ${cy - t1}
              L ${X0 - t3} ${cy - t1}
              L ${X0 - t3} ${cy - t2}
              L ${X0 - t4} ${cy}
              L ${X0 - t3} ${cy + t2}
              L ${X0 - t3} ${cy + t1}
              L ${X0 - t1} ${cy + t1}
              L ${X0 - t1} ${cy + t3}
              L ${X0 - t2} ${cy + t3}
              L ${X0}      ${cy + t4}
              L ${X0 + t2} ${cy + t3}
              L ${X0 + t1} ${cy + t3}
              Z
            `}
          />
          <path
            className="move"
            onMouseEnter={toggleFill}
            onMouseLeave={toggleFill}
            fill="#0000"
            d={`
              M ${X0} ${Y2}
              A${R2} ${R2} 0 1 1 ${X1} ${Y2}
            `}
          />
        </g>
      </g>
    </g>
  )
}