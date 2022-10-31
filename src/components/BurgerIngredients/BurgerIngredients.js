import React, { useState } from 'react';
//
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import IngredientsList from './IngredientsList/IngredientsList';
import './BurgerIngredients.css';

function BurgerIngredients({ data }) {
  //
  const [current, setCurrent] = useState('bun');
  //
  const bun = data.filter((item) => item.type === 'bun');
  const main = data.filter((item) => item.type === 'main');
  const sauce = data.filter((item) => item.type === 'sauce');

  return (
    <section className="burger-ingredients pt-10">
      <h2 className="burger-ingredients__title text text text_type_main-large mb-5">Соберите бургер</h2>
      <ul className="burger-ingredients__tabs" style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Основные
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
      </ul>
      <ul className="burger-ingredients__ul mt-10 scroll">
        <IngredientsList ingredients={bun} />
        <IngredientsList ingredients={main} />
        <IngredientsList ingredients={sauce} />
      </ul>
    </section>
  );
}

export default BurgerIngredients;
