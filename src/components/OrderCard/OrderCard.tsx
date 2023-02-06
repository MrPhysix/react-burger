import React, { useMemo } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './order-card.module.css';
import IngredientImage from '../IngredientImage/IngredientImage';
import { TIngredient, TOrder } from '../../types';
import { openModal, setModalInfo } from '../../services/reducers/modal';

type TOrderCard = {
  order: TOrder | any,
  // onOrderClick: () => void,
}

function OrderCard({ order }: TOrderCard) {
  const feedPathMatch = useMatch('/feed');
  const dispatch = useDispatch();

  const { ingredients }: any = useSelector((state) => state);

  const getIngredientFromId = (id: string) => ingredients.ingredients
    .find((item: TIngredient) => item._id === id);

  const ingredientsByIds = useMemo(() => order.ingredients
    .map((item: any) => getIngredientFromId(item)), [order]);

  const totalPrice = useMemo(() => ingredientsByIds
    .reduce((total: number, curr: any) => total + curr.price, 0), [order]);

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

  // handlers
  const handleDetailsModal = (): void => {
    dispatch(setModalInfo(order));
    dispatch(openModal());
  };

  return (
    <Link
      className={style.card}
      to={`${feedPathMatch ? `/feed/${order._id}` : `/profile/orders/${order._id}`}`}
      onClick={handleDetailsModal}
    >
      <div className={style.flex}>
        <p className="text text_type_digits-default">
          #
          {order.number}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
          {/* {order.updatedAt} */}
        </p>
      </div>
      <h3 className="text text_type_main-medium">{order.name}</h3>
      {order.status && <p className={`${style.status} ${order.status === 'done' && style.statusDone} text text_type_main-default`}>{statusText(order.status)}</p>}
      <div className={style.info}>
        <ul className={style.ul}>
          {
            ingredientsByIds
              .slice(0, 6)
              .map((item: TIngredient, i: number) => {
                if (i === 5) {
                  return (
                    <IngredientImage
                      key={item._id + i}
                      url={item.image}
                      name={item.name}
                      count={ingredientsByIds.length - i}
                    />
                  );
                }
                return (
                  <IngredientImage
                    key={item._id + i}
                    url={item.image}
                    name={item.name}
                  />
                );
              })
          }
        </ul>
        <div className={style.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
