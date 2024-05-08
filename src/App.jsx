import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Categories from "./components/Categories.jsx";
import Sort from "./components/Sort.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";

import pizzas from "./assets/pizzas.json";

export default function App() {

  console.log(pizzas);

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
              {pizzas.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
