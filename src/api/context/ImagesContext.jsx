/**
 * ImagesContext.jsx
 */

import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from './ImagesReducer'

export const ImagesContext = createContext()

export const ImagesProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
    images,
    imagesPerCard,
    total,
    sets,
    layout,
  
    imageSet,
    imageSets,
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


  const getURL = stringOrObject => {
    if (typeof stringOrObject === "string") {
      return stringOrObject
    }

    // console.log("stringOrObject instanceof File:", stringOrObject instanceof File);
    
    return URL.createObjectURL(stringOrObject)
  }


  return (
    <ImagesContext.Provider
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

        getURL
      }}
    >
      {children}
    </ImagesContext.Provider>
  )
}