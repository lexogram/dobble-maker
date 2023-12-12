import React from 'react'
import { Provider } from './api/context/Context'
import { Header } from './ui/component/Header'
import { Dobble } from './ui/component/Dobble'
// import './styles.css'
import './App.css'

function App() {

  return (
    <Provider>
      <Dobble />
      <Header />
    </Provider>
  )
}

export default App
