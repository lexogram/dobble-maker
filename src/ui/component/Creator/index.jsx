/**
 * Create.jsx
 */


import React from 'react'
import { ImageStore } from './ImageStore'
import { CardMaker } from './CardMaker'

export const Create = () => {


  return (
    <article id="create">
      <ImageStore />
      <CardMaker />
    </article>
  )
}