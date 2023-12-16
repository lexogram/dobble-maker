/**
 * SwitchPage.jsx
 */


import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


export const SwitchPage = ({ page }) => {
  const navigate = useNavigate()
  


  const [ thisPage, thatPage ] = page
    ? [ "Make Your Own Dobble", "Choose a Shared Dobble" ]
    : [ "Choose a Shared Dobble", "Make Your Own Dobble"]


  const togglePage = () => {
    switch (page) {
      case "":
        return navigate("/create")
      case "create":
        return navigate("/")
    }
  }

  return (
    <div id="page">
      <h1>{thisPage}</h1>
      <button
        onClick={togglePage}
      >
        {thatPage}
      </button>
    </div>
  )
}