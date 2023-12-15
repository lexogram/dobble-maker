/**
 * Tools_Card.jsx
 */


import React, { useState } from 'react'

import { Selector } from '../../Widget/Selector'
import { Slider } from '../../Widget/Slider'
import allLayouts from '../../../../api/data/layout.json'


export const CardTools = (props) => {
  const imageCount = 57

  const selection  = (() => {
    const layouts = allLayouts[imageCount]
    const layoutNames = Object.keys(layouts)
    return layoutNames
  })()

  const [ selected, setSelected ] = useState(selection[1])
  const [ scale, setScale ] = useState(1)
  

  const setLayout = ({target}) => {
    setSelected(target.value)
  }
  
  const updateScale = value => {
    setScale(value)
  }

  // Layout: selector
  // Card Scale + Reset

  return (
    <div id="card-tools">
      <div id="card-scale">
        <Slider
          max={2}
          min={0.5}
          value={scale}
          onDrag={updateScale}
        />
        <button
          id="reset"
          onClick={() => updateScale(1)}
        >
          ↺
        </button>
      </div>
      <Selector
        selected={selected}
        selection={selection}
        onChange={setLayout}
      />
    </div>
  )
}