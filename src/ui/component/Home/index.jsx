/**
 * Home.jsx
 */


import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';


import { Context } from '../../../api/context/Context';
import { Selector } from '../Widget/Selector'

export const Home = (props) => {
  const navigate = useNavigate()

  const {
    imageSet,
    imageSets,
    setImageSet
  } = useContext(Context)

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
