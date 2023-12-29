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
    imagesPerCard,
    total,
    images,
    cardData,
    layouts,
    layoutNames,
    layoutName,
    cardNumber,

    customLayout,
    cropByDefault,
    useSunburst,

    imageSet,
    imageSets,

    tweakIndices,
    activeImage
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

    // Side-effect: change --image-size so that ImageStore is neat  
    const imageSize = (() => {
      switch (value) {
        case 3:
        case 6:
        case 9:
          return 100/3 + "%"
        case 4:
        case 8:
        case 12:
          return "25%"
        case 5:
        case 10:
          return "20%"
      }
    })()
    document.documentElement.style.setProperty(
      '--image-size', imageSize
    );
  }


  const setImageSet = value => {
    const action = {
      type: "SET_IMAGE_SET",
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


  const setSunburst = value => {
    const action = {
      type: "SET_SUNBURST",
      payload: value
    }
    dispatch(action)
  }


  const getSunburstAngle = ({ cx, cy }, { offsetX, offsetY }) => {
    const x = cx + offsetX
    const y = cy + offsetY

    let angle = x || y
      ? (Math.atan(y / x) / Math.PI * 180) - 90
      : 0

    // Tweak for images on the left
    if (x < 0) {
      angle += 180
    }

    return angle
  }


  const tweakImage = value => {
    const action = {
      type: "TWEAK_IMAGE",
      payload: value
    }
    dispatch(action)
  }


  const setActiveImage = value => {
    const action = {
      type: "SET_ACTIVE_IMAGE",
      payload: value
    }
    dispatch(action)
  }


  const setCardNumber = value => {
    const action = {
      type: "SET_CARD_NUMBER",
      payload: value
    }
    dispatch(action)
  }


  const setLayoutName = value => {
    const action = {
      type: "SET_LAYOUT_NAME",
      payload: value
    }
    dispatch(action)
  }


  const showTweaker = value => {
    const action = {
      type: "SHOW_TWEAKER",
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
      // console.log("stringOrObject:", stringOrObject);
      // HACK >>>

      return stringOrObject
    }

    return URL.createObjectURL(stringOrObject)
  }


  return (
    <Context.Provider
      value ={{
        imagesPerCard,
        total,
        images,
        cardData,
        layouts,
        layoutNames,
        layoutName,
        setLayoutName,

        customLayout,
        setCustomLayout,

        cropByDefault,
        setCropByDefault,

        useSunburst,
        setSunburst,

        cardNumber,
        setCardNumber,

        addImages,
        setImagesPerCard,

        imageSet,
        imageSets,
        setImageSet,

        getURL,
        getSunburstAngle,

        VIEW_WIDTH,
        VIEW_HEIGHT,
        STROKE_WIDTH,
        PADDING,
        SPACING,
        RADIUS,

        swapImages,
        clearImages,

        tweakIndices,
        showTweaker,
        tweakImage,
        activeImage,
        setActiveImage
      }}
    >
      {children}
    </Context.Provider>
  )
}