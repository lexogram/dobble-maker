/**
 * DobbleContext.jsx
 * description
 */

import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from '../reducer/DobbleReducer'
// import {
//   layouts,
//   getSet,
//   imageSets,
//   getImageSet
// } from './filterData'

const VIEW_WIDTH = 2100
const pageHeight = 2970
const STROKE_WIDTH = 1
// The height of the SVG element needs to be trimmed in order
// not to trigger the creation of an extra page.
const pageHeightTweak = 18 // margin of 1.8mm to fit paper
const VIEW_HEIGHT = pageHeight - pageHeightTweak



export const DobbleContext = createContext()



export const DobbleProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
      imageSets,
      imageSet,
      images,

      set,
      layoutNames,
      layoutName,
      layout,

      showDialog
    } = state

  const radius = 490
  const padding = 2
  const spacing = radius + padding


  const setLayoutName = value => {
    const action = {
      type: "SELECT_LAYOUT_NAME",
      payload: value
    }
    dispatch(action)
  }


  const setImageSet = value => {
    const action = {
      type: "SELECT_IMAGE_SET",
      payload: value
    }
    dispatch(action)
  }


  const toggleDialog = value => {
    const action = {
      type: "TOGGLE_DIALOG",
      payload: value
    }
    dispatch(action)
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
        radius,

        showDialog,
        toggleDialog
      }}
    >
      {children}
    </DobbleContext.Provider>
  )
}