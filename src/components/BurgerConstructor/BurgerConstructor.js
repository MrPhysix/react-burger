import React, {
  useState, useMemo, useContext,
} from 'react';
//
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import style from './burger-constructor.module.css';
import BurgerConstructorElement from './BurgerConstructorElement/BurgerConstructorElement';
import { INGREDIENT_TYPES } from '../../utils/const';
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';

import { ConstructorContext } from '../../utils/context';
import getOrderDetails from '../../utils/api/order';

function BurgerConstructor() {
  // consts
  const { selectedIngredients } = useContext(ConstructorContext);
  const [order, setOrder] = useState({});

  const bun = useMemo(
    () => selectedIngredients.length > 0
      && selectedIngredients.find((item) => item.type === INGREDIENT_TYPES.BUN.TYPE),
    [selectedIngredients],
  );

  const noBunIngredients = useMemo(
    () => selectedIngredients.filter((item) => item.type !== INGREDIENT_TYPES.BUN.TYPE),
    [selectedIngredients],
  );

  const totalPrice = useMemo(
    () => selectedIngredients.reduce((total, curr) => {
      if (curr.type === INGREDIENT_TYPES.BUN.TYPE) return total + curr.price * 2;
      return total + curr.price;
    }, 0),
    [selectedIngredients],
  );

  // states
  const [orderIsOpen, setOrderIsOpen] = useState(false);

  // handlers
  const handleOrderModal = {
    open: () => {
      setOrderIsOpen(true);
      const ids = selectedIngredients.map((i) => i._id);
      getOrderDetails(ids).then((res) => setOrder(res));
    },
    close: () => setOrderIsOpen(false),
  };

  if (!selectedIngredients || selectedIngredients.length === 0) return <p className={`${style.noIngredient} text text_type_main-large`}>Ингредиенты не выбраны</p>;

  return (
    <>
      {
        orderIsOpen
        && (
        <Modal handleClose={() => handleOrderModal.close()}>
          <OrderDetails order={order} />
        </Modal>
        )
      }
      <section className={`${style.element} pt-25 pl-4`}>
        <ul className={style.ul}>
          {bun && <BurgerConstructorElement data={bun} position="top" />}
          <ul className={`${style.scroll} scroll`}>
            {
              noBunIngredients.map((item) => (
                <BurgerConstructorElement
                  key={item._key}
                  data={item}
                />
              ))
           }
          </ul>
          {bun && <BurgerConstructorElement data={bun} position="bottom" />}
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

export default BurgerConstructor;
