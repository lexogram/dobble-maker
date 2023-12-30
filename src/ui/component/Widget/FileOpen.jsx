/**
 * FileDialog.jsx
 */


import React, { useContext, useState, useEffect } from 'react'

import { Context } from '../../../api/context/Context'
import { sanitize } from '../../../api/data/file'

const INVALID_FORMAT = "Invalid file format. Choose a different file."



export const FileDialog = () => {
  const {
    showLoadDialog,
    toggleLoadDialog,
    loadFrom
  } = useContext(Context)
  const [ feedback, setFeedback ] = useState(" ")


  const readJSON = ({ target }) => {
    const contents = target.result
    try {
      let json = JSON.parse(contents)
      json = sanitize(json)

      if (!json) {
        return setFeedback(INVALID_FORMAT)
      }

      loadFrom(json);
      toggleLoadDialog()

    } catch {
      setFeedback(INVALID_FORMAT)
    }
  }


  const treatFile = ({ target }) => {
    const { files } = target
    // console.log("target.files:", target.files);
    // [ { lastModified: 1703853929465,
    //     name: "layout.json",
    //     size: 90547,
    //     type: "application/json",
    //     webkitRelativePath: ""
    // }] // <<< There should only be one file

    if (files.length) {
      const file = files[0]
      const fileReader = new FileReader()
      fileReader.onload = readJSON
      fileReader.readAsText(file)
    }
  }


  const dialogOpened = () => {
    setFeedback("")
  }


  useEffect(() => {
    setFeedback("")
  }, [showLoadDialog])


  if (showLoadDialog) {
    return (
      <div className="file-dialog">
        <div className="outline">
          <label>
            <p>Open a JSON file...</p>
            <input
              type="file"
              accept=".json"
              onChange={treatFile}
              onClick={dialogOpened}
            />
          </label>
          <button
            className="close"
            onClick={toggleLoadDialog} // event treated as false
          >
            &times;
          </button>
          <p className="feedback">{feedback}</p>
        </div>
      </div>
    )
  }

  return ""
}