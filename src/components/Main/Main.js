import React from 'react';
import PropTypes from 'prop-types';
//
import style from './main.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
//
import dataObjectPropTypes from '../../utils/propTypes';

function Main({ data }) {
  return (
    <main className={style}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
}

Main.propTypes = {
  data: PropTypes.arrayOf(dataObjectPropTypes).isRequired,
};

export default Main;
