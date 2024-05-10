import React, { createContext, useEffect, useState } from "react";

import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";

export const AppContext = createContext('');

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <AppContext.Provider value={{ searchValue, setSearchValue}}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}
