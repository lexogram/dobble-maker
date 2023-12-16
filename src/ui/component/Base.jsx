/**
 * Base.jsx
 */


import React from 'react'
import { Outlet } from 'react-router-dom'

import { Controller } from './Controller/Controller'



export const Base = (props) => {


  return (
    <>
      <Controller />
      <Outlet /> 
    </>
  )
}