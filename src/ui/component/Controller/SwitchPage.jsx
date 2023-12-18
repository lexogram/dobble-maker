/**
 * SwitchPage.jsx
 */


import React from 'react'
import { useNavigate } from 'react-router-dom'


export const SwitchPage = ({ page }) => {
  const navigate = useNavigate()
  

  const [ thisPage, thatPage ] = page
    ? page === "create"
      ? [ "Make Your Own Dobble", "Choose a Shared Dobble" ]
      : page === "preview"
      ? [ "Print Preview", "Customize"]
      : [ "Choose a Shared Dobble", "Make Your Own Dobble"]
    : [ "Make Your Own Dobble", "Choose a Shared Dobble" ]


  const togglePage = () => {
    switch (page) {
      case "":
      case "create":
        return navigate("/home")
      case "home":
        return navigate("/create")
      case "preview":
        return navigate("/create")
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