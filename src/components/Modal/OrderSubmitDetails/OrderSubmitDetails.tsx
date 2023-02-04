import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import DoneImage from '../../../images/done.svg';
import { TOrder } from '../../../types';

interface IOrderDetails {
  order: TOrder;

}

function OrderSubmitDetails({ order }: IOrderDetails) {
  if (!order || order?.success !== true) return <CirclesWithBar width="82" color="#4C4CFF" ariaLabel="loading" wrapperClass="loading-spinner" />;

  return (
    <>
      <h3 className="digitsShadowGlow text text_type_digits-large mb-8 ml-15 mr-15">{order.order.number}</h3>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={DoneImage} className="mt-15 mb-15" alt="done" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орбитальной станции</p>
    </>
  );
}

export default OrderSubmitDetails;
