import React from 'react'
import { DobbleProvider } from './api/context/DobbleContext'
import { Dobble } from './ui/component/Dobble'
import './styles.css'

function App() {

  return (
    <DobbleProvider>
      <Dobble />
    </DobbleProvider>
  )
}

export default App
