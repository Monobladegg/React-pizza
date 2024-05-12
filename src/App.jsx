import React, { createContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, test } from "./redux/slices/filterSlice";

import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";

export const AppContext = createContext("");

console.log(test())

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  console.log(dispatch)

  return (
    <div className="wrapper">
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
          <button onClick={() => test()}>
            test
          </button>
        </div>
      </div>
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
