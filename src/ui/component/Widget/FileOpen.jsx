/**
 * FileDialog.jsx
 */


import React from 'react'


export const FileDialog = ({ type, ok, cancel }) => {

  // function readSingleFile(e) {
  //   var file = e.target.files[0];
  //   if (!file) {
  //     return;
  //   }
  //   var reader = new FileReader();
  //   reader.onload = function(e) {
  //     var contents = e.target.result;
  //     displayContents(contents);
  //   };
  //   reader.readAsText(file);
  // }
  
  // function displayContents(contents) {
  //   var element = document.getElementById('file-content');
  //   element.textContent = contents;
  // }
  
  // document.getElementById('file-input')
  //   .addEventListener('change', readSingleFile, false);

  

  const readJSON = ({ target }) => {    
    const contents = target.result
    try {
      const json = JSON.parse(contents)
      console.log("json:", json);
      
    } catch {
      console.log("Invalid JSON");
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


  const dialogClosed = () => {
    console.log("Dialog was closed")
  }


  const dialogOpened = () => {
    // Prepare to catch if the user cancels the dialog
    console.log("Dialog was opened")
    const options = { once: true }
    window.addEventListener("focus", dialogClosed, options)
  }


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
        >
          &times;
        </button>
      </div>
    </div>
  )

//   <input type="file" id="file-input" />
// <h3>Contents of the file:</h3>
// <pre id="file-content"></pre>
}