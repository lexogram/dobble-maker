/**
 * Controller.jsx
 */


import React from 'react'
import { useLocation } from 'react-router-dom'

import { SwitchPage } from './SwitchPage'
import { HomeButtons } from './HomeButtons'
import { CreateButtons } from './CreateButtons'


export const Controller = (props) => {
  const location = useLocation()
  const page = location.pathname.replace(/^\//, "")
  // "", "create", ?

  const buttons = page
  ? <CreateButtons />
  : <HomeButtons />

  return (
    <div id="controller">
      <SwitchPage 
        page={page}
      />
      {buttons}
    </div>
  )
}