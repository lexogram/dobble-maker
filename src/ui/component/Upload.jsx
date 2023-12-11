/**
 * Upload.jsx
 */


import React, { useState, useContext } from 'react'
import { DobbleContext } from '../../api/context/DobbleContext'


const IMAGE_REGEX = /\.(png|jpg|jpeg|gif|svg|webp|tiff?|bmp)$/i
export const Upload = () => {
  const { showDialog, toggleDialog } = useContext(DobbleContext)
  const [ files, setFiles ] = useState([])
  


  const toggleUploadDialog = () => {
    toggleDialog(!showDialog)
  }


  const chooseFiles = event => {
    setFiles(event.target.files)
  }


  let listItems = Array.from(files)
  // [ { lastModified: 1702023706980,
  //     name: "parrot.png",
  //     size: 4077,
  //     type: "image/png",
  //     webkitRelativePath: "birds/parrot.png"
  //   }, ...
  // ]
    .filter( file => IMAGE_REGEX.test(file.name))
    .sort((a, b) => (a.name < b.name ? -1: 1))
    .map( file => (
      <label>
        <input
          type="checkbox"
        />
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          title={file.name.replace(IMAGE_REGEX, "")}
        />
      </label>
  ))


  return (
    <div id="upload">

      { showDialog && <div id="mask">
        <input
          type="file"
          id="filepicker"
          name="fileList"
          multiple
          onChange={chooseFiles}
        />
        <div
          id="image-upload"
        >
          {listItems}
        </div>
      </div>
      }

      <button
        onClick={toggleUploadDialog}
      >
        Create Your Own Dobble
      </button>
    </div>
  )
}

// webkitdirectory="true"
