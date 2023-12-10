import React from 'react'
import { DobbleProvider } from './context/DobbleContext'
import { Dobble } from './component/Dobble'
import './styles.css'

function App() {

  return (
    <DobbleProvider>
      <Dobble />
    </DobbleProvider>
  )
}

export default App
