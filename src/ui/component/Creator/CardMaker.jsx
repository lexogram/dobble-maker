/**
 * CardMaker.jsx
 */


import React from 'react'
import { SetTools } from './Tools/SetTools'
import { CardTools } from './Tools/CardTools'
import { ImageTools } from './Tools/ImageTools'

export const CardMaker = () => {


  return (
    <div id="card-maker">
      <SetTools />
      <CardTools />
      <ImageTools />
      <div className="cards">
        <div className="card">
          <svg
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="#420"
            />
          </svg>
        </div>

        <div className="card">
          <svg
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="#440"
            />
          </svg>
        </div>

        <div className="card">
          <svg
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="#040"
            />
          </svg>
        </div>

        <div className="card">
          <svg
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="#044"
            />
          </svg>
        </div>

        <div className="card">
          <svg
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="#024"
            />
          </svg>
        </div>

        <div className="card">
          <svg
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="#004"
            />
          </svg>
        </div>

        <div className="card">
          <svg
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="#303"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}