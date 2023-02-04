import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order-info.module.css';
import IngredientImage from '../../IngredientImage/IngredientImage';

type TInfoIngredient = {
  item: any,
}

function InfoIngredient({ item } : TInfoIngredient) {
  return (
    <li className={style.ingredient}>
      <div className={style.flex}>
        <IngredientImage url={item.img} name={item.title} />
        <p className="text text_type_main-default ml-4 mr-4">{item.title}</p>
      </div>
      <div className={`${style.countPrice} text text_type_digits-default`}>
        <p>1</p>
        x
        <p>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
}

type TOrderInfo = {
  order: any
}

function OrderInfo({ order }: TOrderInfo) {
  return (
    <section className={style.section}>
      <h2 className={`${style.number} text text_type_digits-default mb-15`}>
        #
        {order.number}
      </h2>
      <h1 className="text text_type_main-medium mb-3">{order.title}</h1>
      <p className={`text text_type_main-default ${style.statusColor}`}>{order.status}</p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав</p>
      <ul className={`${style.ul} scroll`}>
        {
          order.ingredients.map((item: any) => <InfoIngredient item={item} />)
        }
      </ul>
      <div className={style.under}>
        <p className="text text_type_main-default text_color_inactive">{order.date}</p>
        <div className={`${style.countPrice} text text_type_digits-default`}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

export default OrderInfo;
