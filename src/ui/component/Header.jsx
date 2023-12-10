/**
 * Header.jsx
 */


import React, { useContext } from 'react'
import { DobbleContext } from '../../api/context/DobbleContext'
import { Selector } from './Selector'



export const Header = () => {
  const {
    layoutName,
    layoutNames,
    setLayoutName
  } = useContext(DobbleContext)


  const selectLayout = event => {
    const value = event.target.value
    setLayoutName(value)
  }


  const layouts = layoutNames.length > 1
    ? <Selector 
        selection={layoutNames}
        selected={layoutName}
        onChange={selectLayout}
      />
    : undefined

  return (
    <div id="header">
       <h1>Dobble</h1>

       {layouts}
    </div>
   
  )
}