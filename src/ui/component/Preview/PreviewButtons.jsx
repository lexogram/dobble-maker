/**
 * PreviewButtons.jsx
 */


import React, { useState, useContext } from 'react'
import { Context } from '../../../api/context/Context'


export const PreviewButtons = () => {
  

  return (
    <button
      onClick={window.print}
    >
      Print
    </button>
  )
}