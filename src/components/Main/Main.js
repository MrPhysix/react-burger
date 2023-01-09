import React from 'react';
import PropTypes from 'prop-types';
//
import style from './main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
//
import ingredientPropTypes from '../../utils/propTypes';

function Main({ ingredients }) {
  return (
    <main className={style.main}>
      <BurgerIngredients ingredients={ingredients} />
      <BurgerConstructor ingredients={ingredients} />
    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default Main;
