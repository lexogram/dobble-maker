/**
 * Controller.jsx
 */


import React from 'react'
import { useLocation } from 'react-router-dom'

import { SwitchPage } from './SwitchPage'
import { HomeButtons } from '../Home/HomeButtons'
import { CreateButtons } from '../Creator/CreateButtons'
import { PreviewButtons } from '../Preview/PreviewButtons'

export const Controller = (props) => {
  const location = useLocation()
  const page = location.pathname.replace(/^\//, "")
  // "", "create", "home", "preview", "play"

  const buttons = page
  ? page === "create"
    ? <CreateButtons />
    : page === "preview"
      ? <PreviewButtons />
      : <HomeButtons />
  : <CreateButtons />

  return (
    <div id="controller">
      <SwitchPage 
        page={page}
      />
      {buttons}
    </div>
  )
}