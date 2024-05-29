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
import { setItems, fetchPizzas } from "src/redux/slices/pizzaSlice.js";

export default function Home({ searchValue }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  async function getPizzas() {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    // await axios
    //   .get(
    //     `https://663ba699fee6744a6ea27281.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    //   )
    //   .then((response) => {
    //     setItems(response.data);
    //     setIsLoading(false);
    //   });

    try {
      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    window.scrollTo(0, 0);
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
    getPizzas();
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
      {
        status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже. (Скорее всего, проблема из-за фронтендеров, сообщите команде разрабов что-бы тех лид отьебал виноватого)</p>
          </div>
        ) : (
          <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
        )
      }
      <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
