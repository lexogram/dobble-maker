/**
 * PreviewButtons.jsx
 */


import React, { useState, useContext } from 'react'
import { ImagesContext } from '../../../api/context/ImagesContext'


export const PreviewButtons = () => {
  

  return (
    <button
      onClick={window.print}
    >
      Print
    </button>
  )
}