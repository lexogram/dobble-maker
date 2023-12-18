/**
 * Routing.jsx
 */


import React from 'react'
import '../../Routing.css'
import {
  ImagesProvider as Provider
} from '../../api/context/ImagesContext';

import { Base } from '../component/Base';
import { Home } from '../component/Home/Home';
import { Create } from '../component/Creator/Create';
import { Preview } from '../component/Preview';

import {
  HashRouter as Router,
  Routes,
  Route,
  // Navigate,
  // NavLink
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