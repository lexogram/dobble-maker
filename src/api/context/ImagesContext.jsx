/**
 * ImagesContext.jsx
 */

import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from './ImagesReducer'

export const ImagesContext = createContext()

export const ImagesProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { images, imagesPerCard } = state


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


  return (
    <ImagesContext.Provider
      value ={{
        images,
        addImages,
        imagesPerCard,
        setImagesPerCard
      }}
    >
      {children}
    </ImagesContext.Provider>
  )
}