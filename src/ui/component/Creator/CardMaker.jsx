/**
 * CardMaker.jsx
 */


import React, {
  useContext,
  useRef,
  useEffect,
  useState
} from 'react'
import { useResize } from '../../../api/hook/useResize'
import { useScrollEnd } from '../../../api/hook/useScrollEnd'

import { Context } from '../../../api/context/Context'
import { SetTools } from './Tools/SetTools'
import { CardTools } from './Tools/CardTools'
import { ImageTools } from './Tools/ImageTools'
import { PreviewButton } from './Tools/PreviewButton'
import { Card } from './Card'

const OFFSET = 50

export const CardMaker = () => {
  const { cardData, setCardNumber } = useContext(Context)
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

  const [ width, height ] = useResize()
  const [ style, setStyle ] = useState({})

  const cardsRef = useRef()
  const makerRef = useScrollEnd(snapToNearestCard)

  const setPadding = () => {
    const { width } = cardsRef.current.getBoundingClientRect()
    const { height } = makerRef.current.getBoundingClientRect()
    let padding = (Math.max(1, height / width) - 1) * width / 2

    padding += "px 0"
    setStyle({ padding })
  }

  useEffect(setPadding, [width, height])
  useEffect(snapToNearestCard, [])


  function snapToNearestCard() {
    const target = makerRef.current
    const diameter = target.scrollWidth

    const { scrollTop } = target

    const cardNumber = Math.round(scrollTop / diameter)
    const top = cardNumber * diameter

    setCardNumber(cardNumber)

    target.scrollTo({ top, behavior: "smooth" })
  }


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
      />
    )
  })


  return (
    <div
      id="card-maker"
      ref={makerRef}
    >
      <SetTools />
      <CardTools />
      <ImageTools />
      <div
        className="cards"
        ref={cardsRef}
        style={style}
      >
        {cards}
      </div>
      <PreviewButton
        page="preview"
      />
    </div>
  )
}