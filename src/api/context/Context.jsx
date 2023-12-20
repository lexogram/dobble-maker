/**
 * Context.jsx
 */

import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from './Reducer'

const VIEW_WIDTH = 2100
const pageHeight = 2970
const STROKE_WIDTH = 1
// The height of the SVG element needs to be trimmed in order
// not to trigger the creation of an extra page.
const pageHeightTweak = 18 // margin of 1.8mm to fit paper
const VIEW_HEIGHT = pageHeight - pageHeightTweak

const RADIUS = 490
const PADDING = 2
const SPACING = RADIUS + PADDING

export const Context = createContext()



export const Provider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
    images,
    imagesPerCard,
    total,
    sets,
    layout,

    imageSet,
    imageSets,

    customLayout,
    cropByDefault
  } = state


  const addImages = imageArray => {
    const action = {
      type: "ADD_IMAGES",
      payload: imageArray
    }
    dispatch(action)
  }


  const setImagesPerCard = value => {
    const action = {
      type: "SET_IMAGES_PER_CARD",
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


  const swapImages = (indices) => {
    const action = {
      type: "SWAP_IMAGES",
      payload: indices
    }
    dispatch(action)
  }


  const clearImages = () => {
    const action = {
      type: "CLEAR_IMAGES"
    }
    dispatch(action)
  }


  const setCustomLayout = value => {
    const action = {
      type: "SET_CUSTOM_LAYOUT",
      payload: value
    }
    dispatch(action)
  }


  const setCropByDefault = value => {
    const action = {
      type: "SET_CROP_BY_DEFAULT",
      payload: value
    }
    dispatch(action)
  }


  const getURL = stringOrObject => {
    if (!stringOrObject) {
      return ""
    } else if (typeof stringOrObject === "string") {
      // <<< HACK for testing during development
      if (location.host.startsWith("127.0.0.1:")) {
        stringOrObject = `/dobble-maker/${stringOrObject}`
      }
      console.log("stringOrObject:", stringOrObject);
      // HACK >>>

      return stringOrObject
    }

    return URL.createObjectURL(stringOrObject)
  }


  return (
    <Context.Provider
      value ={{
        images,
        addImages,
        imagesPerCard,
        setImagesPerCard,
        total,
        sets,
        layout,

        imageSet,
        imageSets,
        setImageSet,

        getURL,

        VIEW_WIDTH,
        VIEW_HEIGHT,
        STROKE_WIDTH,
        PADDING,
        SPACING,
        RADIUS,

        swapImages,
        clearImages,


        customLayout,
        setCustomLayout,
        cropByDefault,
        setCropByDefault
      }}
    >
      {children}
    </Context.Provider>
  )
}