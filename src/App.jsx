/**
 * App.jsx
 */


import React from 'react'
import './App.css'

import { Provider } from './api/context/Context';

import { Base } from './ui/component/Base';
import { Home } from './ui/component/Home/Home';
import { Create } from './ui/component/Creator/Create';
import { Preview } from './ui/component/Preview';

import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Provider>
        <Routes>
          <Route
            path="/"
            element={<Base />}
          >
            <Route index element={<Create />} />
            <Route path="/create" element={<Create />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/home" element={<Home />} />

          </Route>
        </Routes>
      </Provider>
    </Router>
  )
}


export default App