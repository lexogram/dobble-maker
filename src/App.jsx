import React from 'react'
import { Provider } from './api/context/Context'
import { Header } from './ui/component/Page/Header'
import { Dobble } from './ui/component/Page/Dobble'
import './App.css'

function App() {

  return (
    <Provider>
      <main>
        <Dobble />
        <Header />
      </main>
    </Provider>
  )
}

export default App
