import React, { useState, useMemo } from 'react';
//
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import PropTypes from 'prop-types';
import IngredientsList from './IngredientsList/IngredientsList';
import style from './burger-ingredients.module.css';
import { INGREDIENT_TYPES } from '../../utils/const';
import ingredientPropTypes from '../../utils/propTypes';

function BurgerIngredients({ ingredients }) {
  //
  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN[0]);
  //
  const bun = useMemo(
    () => ingredients.filter((item) => item.type === INGREDIENT_TYPES.BUN.TYPE),
    [ingredients],
  );
  const main = useMemo(
    () => ingredients.filter((item) => item.type === INGREDIENT_TYPES.MAIN.TYPE),
    [ingredients],
  );
  const sauce = useMemo(
    () => ingredients.filter((item) => item.type === INGREDIENT_TYPES.SAUCE.TYPE),
    [ingredients],
  );

  return (
    <section className={`${style.ingredients} pt-10`}>
      <h2 className="text text text_type_main-large mb-5">Соберите бургер</h2>
      <ul className={style.flex}>
        <Tab value="bun" active={current === INGREDIENT_TYPES.BUN.TYPE} onClick={setCurrent}>
          {INGREDIENT_TYPES.BUN.NAME}
        </Tab>
        <Tab value="main" active={current === INGREDIENT_TYPES.MAIN.TYPE} onClick={setCurrent}>
          {INGREDIENT_TYPES.MAIN.NAME}
        </Tab>
        <Tab value="sauce" active={current === INGREDIENT_TYPES.SAUCE.TYPE} onClick={setCurrent}>
          {INGREDIENT_TYPES.SAUCE.NAME}
        </Tab>
      </ul>
      <ul className={`${style.ul} mt-10 scroll`}>
        <IngredientsList ingredients={bun} name={INGREDIENT_TYPES.BUN.NAME} />
        <IngredientsList ingredients={main} name={INGREDIENT_TYPES.MAIN.NAME} />
        <IngredientsList ingredients={sauce} name={INGREDIENT_TYPES.SAUCE.NAME} />
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerIngredients;
