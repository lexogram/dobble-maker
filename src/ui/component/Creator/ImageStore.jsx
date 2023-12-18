/**
 * ImageStore.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../api/context/Context'
import { SizeChooser } from './Tools/SizeChooser'


export const ImageStore = () => {
  const {
    images,
    imagesPerCard,
    total,
    getURL
  } = useContext(Context)


  const imageMapper = (_, index) => {
    const imageData = images[index]
    if (!imageData) {
      return (
        <div
          key={`empty_${index}`}
          className='image'
        />
      )
    }

    const {
      name,
      size,
      lastModified
    } = typeof imageData === "object"
      ? imageData
      : { name: imageData.replace(/.*\//, "") }

    const trimmedName = name.replace(/\.\w{3,4}$/, "")
    const src = getURL(imageData)

    const className = index
      ? "image"
      : "image on-all-preview-cards"

    const key = size
      ? `${name}_${size}_${lastModified}`
      : name

    return (
      <div
        key={key}
        className={className}
      >
        <img src={src} alt={trimmedName} />
      </div>
    )
  }

  const slotCount = Math.max(total, images.length)
  const store = Array.from({length: slotCount}, imageMapper)
  const colours = [
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "royal",
    "purple",
    "pink",
    "grey"
  ]
  const firstImage = store.shift()

  const cards = []
  let ii = 0
  while (ii < imagesPerCard) { // = number of cards for an image
    const cardImages = store.splice(0, imagesPerCard-1)
    cardImages.splice(ii, 0, firstImage)

    const colour = colours[ii] || "grey"
    const className = `one-card ${colour}`
    const key = `card_${ii}`

    const cardDiv = (
      <div
        key={key}
        className={className}
      >
        {cardImages}
      </div>
    )
    cards.push(cardDiv)

    ii++
  }

  const extra = images.length - total
  if (extra > 0) {
    cards.push(
      <h1
        key="unused"
      >
        {`+ ${extra} unused images`}
      </h1>
    )
    cards.push(
      <div
        key="extra"
        className="extra"
      >
        {store}
      </div>
    )
  }



  return (
    <div id="image-store">
      <SizeChooser />

      <div id="images-in-cards">
        {cards}
      </div>
    </div>
  )
}