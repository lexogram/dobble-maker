/**
 * ImageStore.jsx
 */


import React, { useContext } from 'react'
import { ImagesContext } from '../../../api/context/ImagesContext'
import { SizeChooser } from './Tools/SizeChooser'


export const ImageStore = () => {
  const {
    images,
    imagesPerCard,
    total
  } = useContext(ImagesContext)


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

    const { name, size, lastModified } = imageData
    const trimmedName = name.replace(/\.\w{3,4}$/, "")
    const src = URL.createObjectURL(imageData)

    return (
      <div
        key={`${name}_${size}_${lastModified}`}
        className='image'
      >
        <img src={src} alt={trimmedName} />
      </div>
    )
  }

  const store = Array.from({length: total}, imageMapper)
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
    cardImages.unshift(firstImage)
    const colour = colours[ii] || "grey"
    const className = `one-card ${colour}`
    const cardDiv = (
      <div
        key={`card_${ii}`}
        className={className}
      >
        {cardImages}
      </div>
    )
    cards.push(cardDiv)

    ii++
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