/**
 * StoreImage.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../api/context/Context'

const IS_FIRST_CLASS = /\bon-all-preview-cards\b/


export const StoreImage = ({ src, name, className, index }) => {
  const { swapImages } = useContext(Context)

  const getDragIndex = event => {
    const dragIndex = event.dataTransfer.getData("text/plain")
    return parseInt(dragIndex, 10)
  }

  const ignoreSelf = event => {    
    return index === getDragIndex(event)
  }

  const startDrag = event => {
    if (!index || IS_FIRST_CLASS.test(className)) {
      // Can't drag the first image or an empty slot
      return event.preventDefault()
    }

    const { target, dataTransfer } = event

    // const image = target.getElementsByTagName("img")[0]
    // dataTransfer.setDragImage(image, 0, 0)
    // TODO: create <canvas> element of the appropriate size

    dataTransfer.setData("text/plain", index)
  }

  const dragEnter = event => {
    if (ignoreSelf(event)) {
      return
    }
    const { target } = event

    if (target.className === "circle"){
      event.target.parentNode.classList.add("hilite")
    } else {
      // Check if this is the left or the right side
    }
  }

  const dragLeave = event => {
    if (ignoreSelf(event)) {
      return
    }

    const { target } = event

    if (target.className === "circle"){
      target.parentNode.classList.remove("hilite")
    } else {
      // Undo whatever we did on dragEnter
    }
  }

  const allowDrop = event => {
    if (ignoreSelf(event)) {
      return
    }
    event.preventDefault()
  }

  const drop = event => {

    const { target } = event
    if (target.className === "circle"){
      // console.log("drop on", name, event.target.className);

      target.parentNode.classList.remove("hilite")
      const dragIndex = getDragIndex(event)

      swapImages({ dragIndex, dropIndex: index })


    } else {
      // console.log("ignored")
    }
  }


  return (
    <div className="square"
      draggable
      onDragStart={startDrag}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragOver={allowDrop}
      onDrop={drop}
    > 
      <div className="gap"
      />
      <div className="circle"
      />

      {src && (<img
        className={className}
        src={src}
        alt={name}
        title={name}
      />)}
    </div>
  )
}