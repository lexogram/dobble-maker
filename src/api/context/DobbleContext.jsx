/**
 * DobbleContext.jsx
 * description
 */

import React, { createContext, useState } from 'react'
import {
  layouts,
  getSet,
  imageSets,
  getImageSet
} from './filterData'

const VIEW_WIDTH = 2100
const pageHeight = 2970
const STROKE_WIDTH = 1
// The height of the SVG element needs to be trimmed in order
// not to trigger the creation of an extra page.
const pageHeightTweak = 18 // margin of 1.8mm to fit paper
const VIEW_HEIGHT = pageHeight - pageHeightTweak



export const DobbleContext = createContext()



export const DobbleProvider = ({ children }) => {
  const [ imageSet, setTheImageSet ] = useState(imageSets[0])
  
  const images = getImageSet(imageSet)

  const { set, imageCount } = getSet(images.length)
  
  const layoutsForThisSize = layouts[imageCount]
  const layoutNames = Object.keys(layoutsForThisSize)
  
  const [ layoutName, setLayoutName ] = useState(
    layoutNames[0]
  )
  const layout = layoutsForThisSize[layoutName]

  const radius = 490
  const padding = 2
  const spacing = radius + padding


  const setImageSet = value => {
    // Need to:
    // 1. Choose the requested image set
    // 2. Count the images to check if the layouts need to change
    // 3. Select the best layout
    // const images = getImageSet(value)
    // const { set, imageCount } = getSet(images.length)
    setTheImageSet(value)
  }


  return (
    <DobbleContext.Provider
      value ={{
        images,
        imageSet,
        imageSets,
        setImageSet,

        layout,
        layoutName,
        layoutNames,
        setLayoutName,

        set,

        VIEW_WIDTH,
        VIEW_HEIGHT,
        STROKE_WIDTH,
        padding,
        spacing,
        radius
      }}
    >
      {children}
    </DobbleContext.Provider>
  )
}