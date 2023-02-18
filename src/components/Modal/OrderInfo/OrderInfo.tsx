import React, { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import style from './order-info.module.css';
import IngredientImage from '../../IngredientImage/IngredientImage';
import { RootState } from '../../../services';
import { TIngredient } from '../../../types';
import { Loader } from '../../App/App';

type TInfoIngredient = {
  item: TIngredient,
}

function InfoIngredient({ item } : TInfoIngredient) {
  if (!item) return <Loader />;
  return (
    <li className={style.ingredient}>
      <div className={style.flex}>
        <IngredientImage url={item.image} name={item.name} />
        <p className="text text_type_main-default ml-4 mr-4">{item.name}</p>
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

const getIngredients = (state: RootState) => state.ingredients;

function OrderInfo({ order }: TOrderInfo) {
  const ingredients = useSelector(getIngredients);

  const getIngredientFromId = (id: string) => ingredients.ingredients
    .find((ingredient) => ingredient._id === id);

  const ingredientsByIds = useMemo(() => order.ingredients
    .map((ingredient: string) => getIngredientFromId(ingredient)), [order]);

  const totalPrice = useMemo(() => ingredientsByIds
    .reduce((total: number, curr: TIngredient) => total + curr.price, 0), [order]);

  const statusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Готовится';
      case 'done':
        return 'Выполнен';
      case 'created':
        return 'Создан';
      default:
        return 'Отменен';
    }
  };

  return (
    <section className={style.section}>
      <h2 className={`${style.number} text text_type_digits-default mb-15`}>
        #
        {order.number}
      </h2>
      <h1 className="text text_type_main-medium mb-3">{order.name}</h1>
      <p className={`text text_type_main-default ${style.statusColor}`}>{statusText(order.status)}</p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав</p>
      <ul className={`${style.ul} scroll`}>
        {
          ingredientsByIds?.map((item: TIngredient) => <InfoIngredient item={item} />)
        }
      </ul>
      <div className={style.under}>
        <p className="text text_type_main-default text_color_inactive">{order.date}</p>
        <div className={`${style.countPrice} text text_type_digits-default`}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

export default OrderInfo;
