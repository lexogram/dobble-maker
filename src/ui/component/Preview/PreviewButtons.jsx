/**
 * PreviewButtons.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../api/context/Context'

import { OpenDialog } from "../Widget/OpenDialog";
import { SaveDialog } from "../Widget/SaveDialog";


export const PreviewButtons = () => {
  const { toggleSaveDialog, toggleOpenDialog } = useContext(Context)
  

  return (
    <div className="preview-buttons">
    <button
      onClick={() => toggleSaveDialog(true)}
    >
      Save...
    </button>
      <button
        onClick={() => toggleOpenDialog(true)}
      >
        Open...
      </button>
      <button
        onClick={window.print}
      >
        Print...
      </button>

      <OpenDialog />
      <SaveDialog />
    </div>
  )
}