/**
 * ImagesContext.jsx
 */

import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from './ImagesReducer'

export const ImagesContext = createContext()

export const ImagesProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { images } = state


  const addImages = imageArray => {
    const action = {
      type: "ADD_IMAGES",
      payload: imageArray
    }
    dispatch(action)
  }

  return (
    <ImagesContext.Provider
      value ={{
        images,
        addImages
      }}
    >
      {children}
    </ImagesContext.Provider>
  )
}