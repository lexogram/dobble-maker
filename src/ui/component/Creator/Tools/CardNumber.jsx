/**
 * CardNumber.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../../api/context/Context'


export const CardNumber = () => {
  const { cardNumber, total } = useContext(Context)

  return (
    <h1
      id="card-number"
    >
      Card {cardNumber + 1}/{total}
    </h1>
  )
}