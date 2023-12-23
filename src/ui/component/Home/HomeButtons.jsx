/**
 * HomeButtons.jsx
 */


import React from 'react'
import { Link } from 'react-router-dom'


export const HomeButtons = (props) => {


  return (
    <div>
      <Link
       to="/account"
       className="button"
      >
        Register | Log in
      </Link>
    </div>
  )
}