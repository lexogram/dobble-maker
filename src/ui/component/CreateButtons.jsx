/**
 * CreateButtons.jsx
 */


import React, { useState } from 'react'


export const CreateButtons = (props) => {
  const [ directory, setDirectory ] = useState(true)

  const filePicker = directory
    ? <input
        type="file"
        id="filepicker"
        name="fileList"
        multiple
        webkitdirectory="true"
        onChange={chooseFiles}
      />
    : <input
        type="file"
        id="filepicker"
        name="fileList"
        multiple
        onChange={chooseFiles}
      />
  
  const toggleFolder = () => {
    setDirectory(!directory)
  }

  function chooseFiles() {
    
  }

  return (
    <>
      <div className="image-count">
        <h1>0 images</h1>
        <p>Use 7, 13, 31, 57, or 133 images</p>
      </div>
      <div className="file-picker">
        {filePicker}
        <label htmlFor="choose-folder">
          <input
            id="choose-folder"
            type="checkbox"
            checked={directory}
            onChange={toggleFolder}
          />
          <span>Choose a directory and all its contents</span>
        </label>
      </div>
    </>
  )
}