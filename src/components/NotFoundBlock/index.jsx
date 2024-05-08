import React from "react";
import s from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={s.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={s.description}>Ты че-то попутал, братан</p>
    </div>
  );
}
