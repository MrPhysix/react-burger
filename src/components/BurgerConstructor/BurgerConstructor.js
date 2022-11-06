import React, { useState, useMemo } from 'react';
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
import ingredientPropTypes from '../../utils/propTypes';
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';

function BurgerConstructor({ ingredients }) {
  // consts
  const bun = useMemo(
    () => ingredients.filter((item) => item.type === INGREDIENT_TYPES.BUN.TYPE),
    [ingredients],
  );
  const noBunIngredients = useMemo(
    () => ingredients.filter((item) => item.type !== INGREDIENT_TYPES.BUN.TYPE),
    [ingredients],
  );
  const totalPrice = useMemo(
    () => ingredients.reduce((total, curr) => total + curr.price, 0),
    [ingredients],
  );

  // states
  const [orderIsOpen, setOrderIsOpen] = useState(false);

  // handlers
  const handleOrderModal = {
    open: () => setOrderIsOpen(true),
    close: () => setOrderIsOpen(false),
  };

  return (
    <>
      {
        orderIsOpen
        && (
        <Modal handleClose={() => handleOrderModal.close()}>
          <OrderDetails />
        </Modal>
        )
      }
      <section className={`${style.element} pt-25 pl-4`}>
        <ul className={style.ul}>
          <BurgerConstructorElement data={bun[0]} position="top" />
          <ul className={`${style.scroll} scroll`}>
            {
            noBunIngredients.map((item) => (
              <BurgerConstructorElement
                key={item._id}
                data={item}
              />
            ))
           }
          </ul>
          <BurgerConstructorElement data={bun[1]} position="bottom" />
        </ul>
        <div className={`${style.info} mt-10`}>
          <div className={`${style.price} mr-10`}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" htmlType="button" onClick={() => handleOrderModal.open()}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerConstructor;
