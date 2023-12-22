/**
 * Card.jsx
 */

import React, { useContext } from 'react'
import { Context } from '../../../api/context/Context'
import { Picture } from "./Picture"



export const Card = ({ card, cardIndex, dimensions, isPreview }) => {
  const {
    total, // required for crop-circle-XXX defId
    images, // [ ..., { source, selfScale }, ...]
    layouts, // { <layoutName>: [ {...card position...}, ...]}
    getURL,
    customLayout,
    cropByDefault,
    useSunburst,
    getSunburstAngle,
} = useContext(Context)
  const { cx: cardX, cy: cardY, r: cardR } = dimensions
  const ratio = cardR / 50

  const { images: cardImages, cardScale, layoutName } = card
  const layout = customLayout
    ? layouts[layoutName]
    : layouts[Object.keys(layouts)[0]]

  const pictures = cardImages.map(( imageData, index ) => {
    const { imageIndex, specificScale } = imageData
    const display = images[imageIndex]

    if (display) {
      // { source: <string | File object>, selfcale: <number> }
      const { source, selfScale } = display

      // console.log("source:", source)
      // <string url>
      // OR
      // { name: "cobra.png",
      //   lastModified: 1702048092580,
      //   webkitRelativePath: "images/reptile/cobra.png",
      //   size: 33562,
      //   type: "image/png"
      // }
      const href = getURL(source)
      // console.log("href:", href);
      // blob:http://domain:port/r4nd0m-ha5h
      // <string url>

      const scale = selfScale * cardScale * specificScale

      const layoutData = layout[index]

      let { cx, cy, r, fill } = layoutData
      cx *= ratio
      cx += cardX
      cy *= ratio
      cy += cardY
      r *= (ratio * scale)

      // console.log("layoutData", layoutData);
      // { "cx": 17.054, "cy": 34.442, "r": 11.566, fill: #080 }

      const rotation = useSunburst
        ? getSunburstAngle(layoutData)
        : imageData.rotation

      const crop = imageData.crop === 0
        ? cropByDefault
        : imageData.crop      

      // We need to use `total` here, because all SVGs might be in
      // the same scope
      const defId = `crop-circle-${cardIndex*total + imageIndex}`

      const pictureData = {
        ...imageData, // offsetX, offsetY, zIndex
        href,
        cx,
        cy,
        r,
        rotation,   // overwrites ...imageData
        scale,
        crop,     // overwrites ...imageData
        defId,
        isPreview
      }

      return (
        <Picture
          key={defId}
          {...pictureData}
        />
      )
    }
  })

  if (isPreview) {
    return (
      <>
        <circle
          cx={cardX}
          cy={cardY}
          r={cardR}
          fill="#fff"
        />
        {pictures}
      </>
    )
  }

  return (
    <svg
      key={"card_"+cardIndex}
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="50"
        fill="#fff"
      />
      {pictures}
    </svg>
  )
}