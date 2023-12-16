/**
 * SizeChooser.jsx
 */


import React, { useState } from 'react'


export const SizeChooser = (props) => {
  const [ imagesPerCard, setImagesPerCard ] = useState(8)
  
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
      />
      <span>{perCard}</span>
    </label>
  ))

  return (
    <div id="size-chooser">
      <span>Images per card: </span>
      
      <div
        onChange={setPerCard}
      >
        {radioButtons}
      </div>
      <span>(Requires {imagesTotal} images in total)</span>
    </div>
  )
}