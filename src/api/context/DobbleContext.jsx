/**
 * DobbleContext.jsx
 * description
 */

import React, { createContext, useState } from 'react'
import allImages from '../data/images.json'
import { layouts, getSet } from './filterData'

const DEFAULT_LAYOUT = 0

const VIEW_WIDTH = 2100
const pageHeight = 2970
const STROKE_WIDTH = 1
// The height of the SVG element needs to be trimmed in order
// not to trigger the creation of an extra page.
const pageHeightTweak = 18 // margin of 1.8mm to fit paper
const VIEW_HEIGHT = pageHeight - pageHeightTweak



export const DobbleContext = createContext()



export const DobbleProvider = ({ children }) => {
  const images = allImages["animals"].map( file => `animals/${file}`)

  const { set, imageCount } = getSet(images.length)
  
  const layoutsForThisSize = layouts[imageCount]
  const layoutNames = Object.keys(layoutsForThisSize)
  
  const [ layoutName, setLayoutName ] = useState(
    layoutNames[DEFAULT_LAYOUT]
  )
  const layout = layoutsForThisSize[layoutName]

  const radius = 490
  const padding = 2
  const spacing = radius + padding


  return (
    <DobbleContext.Provider
      value ={{
        images,
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