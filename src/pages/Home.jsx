import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentPage, setCategoryId, setSort } from "../redux/slices/filterSlice";
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";

import axios from "axios";
import Pagination from "src/components/Pagination/index.jsx";

export default function Home({ searchValue }) {
  const dispatch = useDispatch();
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [sortType, setSortType] = useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(categoryId === 0 ? 10 : 4)].map(
    (_, index) => <Skeleton key={index} />
  );

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://663ba699fee6744a6ea27281.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
