/**
 * Context.jsx
 * description
 */

import React, { createContext, useReducer, useEffect } from 'react'
import { reducer, initialState } from './Reducer'
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



export const Context = createContext()



export const Provider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
      page,

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


  const setPage = value => {
    const action = {
      type: "SET_PAGE",
      payload: value
    }
    dispatch(action)
    
  }


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
    <Context.Provider
      value ={{
        page,
        setPage,

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
    </Context.Provider>
  )
}