/**
 * Selector.jsx
 */


import React from 'react'


export const Selector = ({ selection, selected, onChange }) => {
  const options = selection.map( value => (
    <option
      key={value}
      value={value}
    >
      {value.replace(/_/g, " ")}
    </option>
  ))

  // console.log("selection, selected, onChange:", selection, selected, onChange);
  

  return (
    <select
      value={selected}
      onChange={onChange}
    >
      {options}
    </select>
  )
}