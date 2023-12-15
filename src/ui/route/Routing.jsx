/**
 * Routing.jsx
 */


import React from 'react'
import '../../Routing.css'
import {
  ImagesProvider as Provider
} from '../../api/context/ImagesContext';

import { Base } from '../component/Base';
import { Home } from '../component/Home';
import { Create } from '../component/Creator/Create';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink
} from "react-router-dom";


export const Routing = (props) => {


  return (
    <Router>
      <Provider>
        <Routes>
          <Route
            path="/"
            element={<Base />}
          >
            <Route index element={<Home />} />
            <Route path="/create" element={<Create />} />

          </Route>
        </Routes>
      </Provider>
    </Router>
  )
}