import React, { useEffect, useState } from "react";
import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Categories from "./components/Categories.jsx";
import Sort from "./components/Sort.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";

import axios from "axios";

export default function App() {

  // https://663ba699fee6744a6ea27281.mockapi.io/items

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('https://663ba699fee6744a6ea27281.mockapi.io/items').then((response) => {
      setItems(response.data);
    })
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
