/**
 * PreviewButtons.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../api/context/Context'
import { FileDialog } from "../Widget/FileOpen";


export const PreviewButtons = () => {
  const { saveAsJSON, loadFromJSON } = useContext(Context)
  

  return (
    <div className="preview-buttons">
    <button
      onClick={saveAsJSON}
    >
      Save...
    </button>
      <button
        onClick={loadFromJSON}
      >
        Load...
      </button>
      <button
        onClick={window.print}
      >
        Print...
      </button>

      <FileDialog />
    </div>
  )
}