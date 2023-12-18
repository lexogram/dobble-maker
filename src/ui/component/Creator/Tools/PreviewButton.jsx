/**
 * PreviewButton.jsx
 */


import React, { useContext } from 'react'
import { ImagesContext } from '../../../../api/context/ImagesContext'
import { useNavigate } from 'react-router-dom'



export const PreviewButton = ({ page }) => {
  const navigate = useNavigate()
  const { total, images } = useContext(ImagesContext)
  const disabled = images.length < total



  const togglePreview = () => {
    navigate(`/${page}`)
  }

  return (
    <button
      id="preview"
      disabled={disabled}
      onClick={togglePreview}
    >
      Preview
    </button>
  )
}