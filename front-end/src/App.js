import logo from './logo.svg';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./Home";
import {Profile} from "./Profile";
import {Main} from "./Main";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />

        </Route>
            <Route path="/profile" exact element={<Profile />}/>
            <Route path="/main" exact element={<Main />}/>
      </Routes>
    </BrowserRouter>
  );
}
