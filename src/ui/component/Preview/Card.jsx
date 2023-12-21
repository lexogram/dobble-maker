/**
 * Card.jsx
 */

import React, { useContext} from "react"
import { Context } from "../../../api/context/Context";
import { Picture } from "./Picture";
import { lcg } from "../../../api/lcg";


const random = lcg()



export const Card = ({ index, card, cx: cardX, cy: cardY, r: cardR }) => {
  const { layout, getURL, cropByDefault } = useContext(Context)
  // cardR is actually relative to a card with _diameter_ 100
  const ratio = cardR / 50

  // console.log("card:", card);
  

  const images = card.map(( imageData, imageIndex ) => {
    const { src="", scale=1 } = imageData || {}
    let { cx, cy, r, fill } = layout[imageIndex]
    cx *= ratio
    cx += cardX
    cy *= ratio
    cy += cardY
    r *= (ratio * scale)
    const rotation = random() * 360
    // 20 is acceptable here because there will never be more than
    // 20 images on a single card.
    const defId = `crop-circle-${index * 20 + imageIndex}`

    const href = getURL(src)

    return (
      <Picture
        key={defId}
        {...{ cx, cy, r, defId, href, rotation, fill }}
        crop={cropByDefault}
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