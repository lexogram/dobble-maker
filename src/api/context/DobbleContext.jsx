/**
 * DobbleContext.jsx
 * description
 */

import React, { createContext, useState } from 'react'
import allImages from '../data/images.json'
import layouts from '../data/layout.json'

import allSets from '../data/shuffledSets.json'
const sets = Object.values(allSets)
.filter( value => Array.isArray(value))
.sort(( a, b ) => a.length - b.length)
const setLengths = sets.map( set => set.length )
setLengths.push(9999)

const DEFAULT_LAYOUT = 1

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
  let imageCount = images.length

  const setIndex = setLengths.findIndex( setLength => setLength > imageCount) - 1

  const set = sets[setIndex]
  imageCount = setLengths[setIndex]
  
  const layoutsForThisSize = layouts[imageCount]
  const layoutNames = Object.keys(layoutsForThisSize)
  
  const [ layoutName, setLayoutName ] = useState(
    layoutNames[DEFAULT_LAYOUT]
  )
  const layout = Object.values(layoutsForThisSize[layoutName].circles)

  const radius = 490
  const padding = 2
  const spacing = radius + padding


  return (
    <DobbleContext.Provider
      value ={{
        images,
        layout,
        // layoutName,
        // setLayoutName,
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