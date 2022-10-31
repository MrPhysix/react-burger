import React from 'react';
//
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import './BurgerConstructor.css';
import BurgerConstructorElement from './BurgerConstructorElement/BurgerConstructorElement';

function BurgerConstructor({ data }) {
  const getTotalPrice = () => data.reduce((total, curr) => total + curr.price, 0);
  const bun = data.filter((item) => item.type === 'bun');
  const ingredients = data.filter((item) => item.type !== 'bun');

  return (
    <section className="burger-constructor pt-25 pl-4">
      <ul className="burger-constructor__ul">
        <BurgerConstructorElement data={bun[0]} position="top" />
        {/* не очень понял как тут реализовать нужно было верстку */}
        {/* уверен что можно делать в одном скролле с фиксом позиции (но я не знаю) */}
        <ul className="ul__scroll scroll">
          {
            ingredients.map((item) => (
              <BurgerConstructorElement
                key={item.name}
                data={item}
              />
            ))
           }
        </ul>
        <BurgerConstructorElement data={bun[1]} position="bottom" />
      </ul>
      <div className="burger-constructor__info mt-10" style={{ display: 'flex' }}>
        <div className="info__price mr-10">
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

export default BurgerConstructor;
