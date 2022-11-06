import React from 'react';
import style from './order-details.module.css';
import DoneImage from '../../../images/done.svg';

function OrderDetails() {
  return (
    <>
      <h3 className={`${style.title} text text_type_digits-large mb-8 ml-15 mr-15`}>034536</h3>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={DoneImage} className="mt-15 mb-15" alt="done" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орбитальной станции</p>
    </>
  );
}

export default OrderDetails;
