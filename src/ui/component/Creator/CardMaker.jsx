/**
 * CardMaker.jsx
 */


import React, { useContext } from 'react'
import { ImagesContext } from '../../../api/context/ImagesContext'
import { SetTools } from './Tools/SetTools'
import { CardTools } from './Tools/CardTools'
import { ImageTools } from './Tools/ImageTools'
import { PreviewButton } from './Tools/PreviewButton'
import { Picture } from '../Page/Picture'
import { lcg } from '../../../api/lcg'

const random = lcg()
const OFFSET = 50

export const CardMaker = () => {
  const { images, total, sets, layout, getURL } = useContext(ImagesContext)
  // console.log("sets:", sets);
  // [
  //   [  0,  1,  2,  3,  4,  5,  6,  7 ],
  //   [  8,  0,  9, 10, 11, 12, 13, 14 ],
  //   ...
  //   [ 44, 26, 50,  7, "32", "38", 14, 20 ]
  // ]
  // console.log("layout:", layout);
  // [ { "cx": 0, "cy": -30.312, "r": 19.687 },
  //   ...
  //   { "cx": 17.054, "cy": 34.442, "r": 11.566 }
  // ]

  const cards = sets.map(( set, setIndex ) => {
    const pictures = set.map(( imageIndex, layoutIndex ) => {      
      const imageData = images[imageIndex]
      // { name: "cobra.png",
      //   lastModified: 1702048092580,
      //   webkitRelativePath: "images/reptile/cobra.png",
      //   size: 33562,
      //   type: "image/png"
      // }

      if (imageData) {
        const href = getURL(imageData)
        // blob:http://domain:port/r4nd0m-ha5h

        const layoutData = layout[layoutIndex]
        // console.log("layoutData:", layoutData);
        // { "cx": 17.054, "cy": 34.442, "r": 11.566 }

        // Calculate "sunburst" angle
        const { cx, cy } = layoutData
        let angle = cx && cy
          ? (Math.atan(cy / cx) / Math.PI * 180) - 90
          : 0
        // Tweak for images on the left
        if (cx < 0) {
          angle += 180
        }

        const rotation = angle // 0 // random() * 360
        const defId = `crop-circle-${setIndex*total + imageIndex}`
        const pictureData = {
          ...layoutData,
          href,
          defId,
          rotation,
          offset: OFFSET
        }

        return (
          <Picture
            key={defId}
            {...pictureData}
            name={imageData.name}
          />
        )
      }
    })
    // console.log(" ")
    return (
      <svg
        key={setIndex}
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
  })


  return (
    <div id="card-maker">
      <SetTools />
      <CardTools />
      <ImageTools />
      <div className="cards">
        {cards}
      </div>
      <PreviewButton
        page="preview"
      />
    </div>
  )
}