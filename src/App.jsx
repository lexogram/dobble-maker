import React from 'react'
import { DobbleProvider } from './context/DobbleContext'
import { Header } from './ui/component/Header'
import { Dobble } from './ui/component/Dobble'
import './styles.css'

function App() {

  return (
    <DobbleProvider>
      <Dobble />
      <Header />
    </DobbleProvider>
  )
}

export default App
