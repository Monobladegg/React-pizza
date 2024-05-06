import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Categories from "./components/Categories.jsx";
import Sort from "./components/Sort.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";

export default function App() {
  return (
    <>
      <div class="wrapper">
        <Header />
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">
              <PizzaBlock title="Мексиканская" price={500} />
              <PizzaBlock title="Вегетарианская" price={350} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
