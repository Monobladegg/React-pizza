import React, { useState } from "react";

export default function Categories( {value, onChangeCategory} ) {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => <li
          key={index}
          onClick={() => onChangeCategory(index)}
          className={value === index ? "active" : ""}
        >
          {categoryName}
        </li>)}
      </ul>
    </div>
  );
}
