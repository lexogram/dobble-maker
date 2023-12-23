/**
 * Register.jsx
 */


import React, { useState } from 'react'


export const Register = () => {
  const [ hidePassword, setHidePassword ] = useState(true)
  

  const togglePassword = event => {
    event.preventDefault()
    setHidePassword(!hidePassword)
  }

  
  return (
    <form>
      <label
        htmlFor="register-email"
      >
        <span>Email address:</span>
        <input
          type="email"
          name="email"
          id="register-email"
        />
      </label>
      <label
        htmlFor="register-password"
      >
        <span>Password:</span>
        <input
          type={hidePassword ? "password" : "text"}
          name="password"
          id="register-password"
        />
        <button
          onClick={togglePassword}
        >
          { hidePassword ? "🧐" : "😑" }
        </button>
      </label>
    </form>
  )
}