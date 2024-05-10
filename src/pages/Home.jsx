import React, { useEffect, useState } from "react";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";

import axios from "axios";

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://663ba699fee6744a6ea27281.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
    scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(categoryId === 0 ? 10 : 4)].map((_, index) => (
              <Skeleton key={index} />
            ))
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}
