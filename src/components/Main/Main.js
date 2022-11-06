import React from 'react';
import PropTypes from 'prop-types';
//
import style from './main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
//
import ingredientPropTypes from '../../utils/propTypes';

function Main({ data, states }) {
  return (
    <main className={style.main}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} handleOrderModal={states.handleOrderModal} />
    </main>
  );
}

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  states: PropTypes.shape({}).isRequired,
};

export default Main;
