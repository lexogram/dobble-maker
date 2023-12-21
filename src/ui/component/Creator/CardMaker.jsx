/**
 * CardMaker.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../api/context/Context'
import { SetTools } from './Tools/SetTools'
import { CardTools } from './Tools/CardTools'
import { ImageTools } from './Tools/ImageTools'
import { PreviewButton } from './Tools/PreviewButton'
import { Card } from './Card'
// import { Picture } from '../Preview/Picture'

const OFFSET = 50

export const CardMaker = () => {
  const {
    cardData,
    layouts
  } = useContext(Context)
  // console.log("cardData:", cardData);
  // [ { "images": [ {
  //         "display": {
  //           "source", // <undefined | string url | File object>
  //           "selfScale": 1
  //         },
  //         "specificScale": 1,
  //         "rotation": 75.71391084,
  //         "offsetX": 0,
  //         "offsetY": 0,
  //         "zIndex": 0,
  //         "crop": 0
  //       }, ...
  //     ],
  //     "layoutName": <string layout name>,
  //     "cardScale": 1
  //   }, ...
  // ]



  const cards = cardData.map(( card, index ) => {
    // console.log("card:", card);
    // { images; [{
    //     "imageIndex": <integer>,
    //     "specificScale": <number>,
    //     "rotation": <number 0-360>,
    //     "offsetX": <number>,
    //     "offsetY": <number>,
    //     "zIndex": <integer>,
    //     "crop": <0 | true | false>
    //   }, ...],
    //   cardScale: <number>,
    //   layoutName: <string>
    // }

    const dimensions = {
      cx: OFFSET,
      cy: OFFSET,
      r:  OFFSET
    }

    return (
    <Card
      key={"card_" + index}
      cardIndex={index}
      card={card}
      dimensions={dimensions}
    />)
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