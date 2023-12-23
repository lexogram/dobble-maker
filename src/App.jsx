/**
 * App.jsx
 */


import React from 'react'
import './SCSS/App.scss'

import { useScrollSize } from './api/hook/useScrollSize'

import { Provider } from './api/context/Context';

import { Base } from './ui/component/Base';
import { Home } from './ui/component/Home';
import { Create } from './ui/component/Creator';
import { Preview } from './ui/component/Preview';
import { Account } from './ui/component/Account';

import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  // Set --scroll-size custom CSS property in App.css to OS value
  const scrollSize = useScrollSize()
  document.documentElement.style.setProperty(
    '--scroll-size', scrollSize + 1 + "px"
  );

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
            <Route path="/account" element={<Account />} />

          </Route>
        </Routes>
      </Provider>
    </Router>
  )
}


export default App