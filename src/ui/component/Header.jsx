/**
 * Header.jsx
 */


import React, { useContext } from 'react'
import { DobbleContext } from '../../context/DobbleContext'
import { Selector } from './Selector'



export const Header = () => {
  const {
    imageSet,
    imageSets,
    setImageSet,

    layoutName,
    layoutNames,
    setLayoutName
  } = useContext(DobbleContext)


  const selectLayout = event => {
    const value = event.target.value
    setLayoutName(value)
  }

  const selectImageSet = event => {
    const value = event.target.value
    setImageSet(value)
  }


  const sets = imageSets.length > 1
    ? <Selector 
        selection={imageSets}
        selected={imageSet}
        onChange={selectImageSet}
      />
    : undefined


    const layouts = layoutNames.length > 1
      ? <Selector 
          selection={layoutNames}
          selected={layoutName}
          onChange={selectLayout}
        />
      : undefined

  return (
    <div id="header">
       <h1>Dobble</h1>
       {sets}
       {layouts}
    </div>
   
  )
}