/**
 * CardNumber.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../../api/context/Context'


export const CardNumber = () => {
  const { cardNumber } = useContext(Context)

  return (
    <h1
      id="card-number"
    >
      Card {cardNumber + 1}
    </h1>
  )
}