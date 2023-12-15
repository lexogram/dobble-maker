/**
 * SetTools.jsx
 */


import React, { useState } from 'react'


export const SetTools = () => {
  const [ custom, setCustom ] = useState(true)
  

  const toggleCustom = ({ target }) => {
    const custom = target.id.startsWith("custom")
    setCustom(custom)
  }

  return (
    <div id="set-tools">
      <label htmlFor="custom-layout">
        <input
          id="custom-layout"
          type="radio"
          name="fix-layout"
          value="custom"
          checked={custom}
          onChange={toggleCustom }
        />
        <span>Custom layout for each card</span>
      </label>
      <label htmlFor="fixed-layout">
        <input
          id="fixed-layout"
          type="radio"
          name="fix-layout"
          value="fixed"
          checked={!custom}
          onChange={toggleCustom }
        />
        <span>Uniform layout for all cards</span>
      </label>
    </div>
  )
}