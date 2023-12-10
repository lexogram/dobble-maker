/**
 * Card.jsx
 */

import React, { useContext} from "react"
import { DobbleContext } from "../../api/context/DobbleContext";
import { Picture } from "./Picture";
import { lcg } from "../../api/lcg";


const random = lcg()



export const Card = ({ index, hrefs, cx: cardX, cy: cardY, r: cardR }) => {
  const { layout } = useContext(DobbleContext)
  // cardR is actually relative to a card with _diameter_ 100
  const ratio = cardR / 50 

  const images = hrefs.map(( href, imageIndex ) => {    
    let { cx, cy, r, fill } = layout[imageIndex]
    cx *= ratio
    cx += cardX
    cy *= ratio
    cy += cardY
    r *= ratio
    const rotation = random() * 360
    const defId = `crop-circle-${index * 20 + imageIndex}`

    return (
      <Picture
        key={defId}
        {...{ cx, cy, r, defId, href, rotation, fill }}
      />
    )
  })


  return (
    <g>
      <circle
        cx={cardX}
        cy={cardY}
        r={cardR}
      />
      {images}
    </g>
  )
}