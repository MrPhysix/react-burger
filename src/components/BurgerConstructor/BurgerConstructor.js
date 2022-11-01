import React from 'react';
import PropTypes from 'prop-types';
//
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import style from './burger-constructor.module.css';
import BurgerConstructorElement from './BurgerConstructorElement/BurgerConstructorElement';
import { INGREDIENT_TYPES } from '../../utils/const';
import dataObjectPropTypes from '../../utils/propTypes';

function BurgerConstructor({ data }) {
  const bun = data.filter((item) => item.type === INGREDIENT_TYPES.BUN[0]);
  const ingredients = data.filter((item) => item.type !== INGREDIENT_TYPES.BUN[0]);
  const getTotalPrice = () => data.reduce((total, curr) => total + curr.price, 0);

  return (
    <section className={`${style.element} pt-25 pl-4`}>
      <ul className={style.ul}>
        <BurgerConstructorElement data={bun[0]} position="top" />
        {/* не очень понял как тут реализовать нужно было верстку */}
        {/* уверен что можно делать в одном скролле с фиксом позиции (но я не знаю) */}
        <ul className={`${style.scroll} scroll`}>
          {
            ingredients.map((item) => (
              <BurgerConstructorElement
                key={item._id}
                data={item}
              />
            ))
           }
        </ul>
        <BurgerConstructorElement data={bun[1]} position="bottom" />
      </ul>
      <div className={`${style.info} mt-10`} style={{ display: 'flex' }}>
        <div className={`${style.price} mr-10`}>
          <p className="text text_type_digits-medium">{getTotalPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" htmlType="button">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataObjectPropTypes).isRequired,
};

export default BurgerConstructor;
