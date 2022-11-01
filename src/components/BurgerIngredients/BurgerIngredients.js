import React, { useState } from 'react';
//
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import PropTypes from 'prop-types';
import IngredientsList from './IngredientsList/IngredientsList';
import style from './burger-ingredients.module.css';
import { INGREDIENT_TYPES } from '../../utils/const';
import dataObjectPropTypes from '../../utils/propTypes';

function BurgerIngredients({ data }) {
  //
  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN[0]);
  //
  const bun = data.filter((item) => item.type === INGREDIENT_TYPES.BUN[0]);
  const main = data.filter((item) => item.type === INGREDIENT_TYPES.MAIN[0]);
  const sauce = data.filter((item) => item.type === INGREDIENT_TYPES.SAUCE[0]);

  return (
    <section className={`${style.ingredients} pt-10`}>
      <h2 className="burger-ingredients__title text text text_type_main-large mb-5">Соберите бургер</h2>
      <ul className="burger-ingredients__tabs" style={{ display: 'flex' }}>
        <Tab value="bun" active={current === INGREDIENT_TYPES.BUN[0]} onClick={setCurrent}>
          {INGREDIENT_TYPES.BUN[1]}
        </Tab>
        <Tab value="main" active={current === INGREDIENT_TYPES.MAIN[0]} onClick={setCurrent}>
          {INGREDIENT_TYPES.MAIN[1]}
        </Tab>
        <Tab value="sauce" active={current === INGREDIENT_TYPES.SAUCE[0]} onClick={setCurrent}>
          {INGREDIENT_TYPES.SAUCE[1]}
        </Tab>
      </ul>
      <ul className={`${style.ul} mt-10 scroll`}>
        <IngredientsList ingredients={bun} name={INGREDIENT_TYPES.BUN[1]} />
        <IngredientsList ingredients={main} name={INGREDIENT_TYPES.MAIN[1]} />
        <IngredientsList ingredients={sauce} name={INGREDIENT_TYPES.SAUCE[1]} />
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataObjectPropTypes).isRequired,
};

export default BurgerIngredients;
