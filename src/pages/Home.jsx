import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sortList } from "../components/Sort.jsx";
import qs from "qs";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";

import axios from "axios";
import Pagination from "src/components/Pagination/index.jsx";


export default function Home({ searchValue }) {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  
  const sort = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  function fetchPizzas() {
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
    }

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  
    const skeletons = [...new Array(categoryId === 0 ? 10 : 4)].map(
      (_, index) => <Skeleton key={index} />
    );

    

  useEffect(() => {
    if (isMounted.current) {
          const queryString = qs.stringify({
            sortProperty: sortType,
            categoryId,
            currentPage,
          });
          navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
