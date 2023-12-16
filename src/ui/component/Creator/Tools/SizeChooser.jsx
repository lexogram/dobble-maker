/**
 * SizeChooser.jsx
 */


import React, { useContext } from 'react'
import { ImagesContext } from '../../../../api/context/ImagesContext'

export const SizeChooser = () => {
  const {
    imagesPerCard,
    setImagesPerCard
  } = useContext(ImagesContext)
  
  const imagesTotal = imagesPerCard * (imagesPerCard - 1) + 1

  const setPerCard = event => {
    const imagesPerCard = parseInt(event.target.id);
    setImagesPerCard(imagesPerCard)
  }

  const imagesPerCardArray = [3, 4, 6, 8, 12]
  const radioButtons = imagesPerCardArray.map( perCard => (
    <label
      key={perCard}
      className="images-per-card"
      htmlFor={`${perCard}-per-card`}
    >
      <input
        type="radio"
        name="images-per-card"
        id={`${perCard}-per-card`}
        checked={perCard === imagesPerCard}
        onChange={setPerCard}
      />
      <span>{perCard}</span>
    </label>
  ))

  return (
    <div id="size-chooser">
      <span>Images per card: </span>
      
      <div>
        {radioButtons}
      </div>
      <span>(Requires {imagesTotal} images in total)</span>
    </div>
  )
}