import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import style from './order-card.module.css';
import IngredientImage from '../IngredientImage/IngredientImage';

const status = {
  done: false,
};

type TOrder = {
  number: number,
  date: string,
  title: string,
  status: string,
  ingredients: Array<any>,
}

type TOrderCard = {
  order: TOrder,
  onOrderClick: any,
}

function OrderCard({ order, onOrderClick }: TOrderCard) {
  const feedPathMatch = useMatch('/feed');
  return (
    <Link
      className={style.card}
      to={`${feedPathMatch ? '/feed/1' : '/profile/orders/1'}`}
      onClick={onOrderClick}
    >
      <div className={style.flex}>
        <p className="text text_type_digits-default">
          #
          {order.number}
        </p>
        <p className="text text_type_main-default text_color_inactive">{order.date}</p>
      </div>
      <h3 className="text text_type_main-medium">{order.title}</h3>
      {status && <p className={`${style.status} ${status.done && style.statusDone} text text_type_main-default`}>{order.status}</p>}
      <div className={style.info}>
        <ul className={style.ul}>
          {
            order.ingredients
              .slice(0, 6)
              .map((item, i) => {
                if (i === 5) {
                  return (
                    <IngredientImage
                      url={item.img}
                      name={item.name}
                      count={order.ingredients.length - 6}
                    />
                  );
                }
                return (
                  <IngredientImage
                    url={item.img}
                    name={item.name}
                  />
                );
              })
          }
        </ul>
        <div className={style.price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
