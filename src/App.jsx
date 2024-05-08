import React, { useEffect, useState } from "react";

import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  // https://663ba699fee6744a6ea27281.mockapi.io/items

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
