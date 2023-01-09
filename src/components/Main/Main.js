import React from 'react';
//
import style from './main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
//

function Main() {
  return (
    <main className={style.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default Main;
