import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";

export const AppContext = createContext("");

export default function App() {

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}
