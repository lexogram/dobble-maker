/**
 * Tools_Card.jsx
 */


import React, { useState, useContext } from 'react'

import { Context } from '../../../../api/context/Context'
import { Selector } from '../../Widget/Selector'
import { Slider } from '../../Widget/Slider'
import { CardNumber } from './CardNumber'



export const CardTools = (props) => {
  const {
    layoutNames,
    layoutName,
    setLayoutName
  } = useContext(Context)

  const [ scale, setScale ] = useState(1)
  

  const selectLayout = ({target}) => {
    setLayoutName(target.value)
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
      { layoutNames.length > 1 && <Selector
        selected={layoutName}
        selection={layoutNames}
        onChange={selectLayout}
      />}
      <CardNumber />
    </div>
  )
}