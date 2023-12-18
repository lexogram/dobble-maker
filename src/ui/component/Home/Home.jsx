/**
 * Home.jsx
 */


import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';


import { ImagesContext } from '../../../api/context/ImagesContext';
import { Selector } from '../Widget/Selector'

export const Home = (props) => {
  const navigate = useNavigate()

  const {
    imageSet,
    imageSets,
    setImageSet
  } = useContext(ImagesContext)

  const selectImageSet = event => {
    const value = event.target.value
    setImageSet(value)
    navigate("/preview")
  }


  const sets = imageSets.length > 1
    ? <Selector
        selection={imageSets}
        selected={imageSet}
        onChange={selectImageSet}
      />
    : undefined

  return (
    <div>
      {sets}
    </div>
  )
}
