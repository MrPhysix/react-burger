import React from 'react';
import { useSelector } from 'react-redux';
import OrderInfo from '../../components/Modal/OrderInfo/OrderInfo';

import style from './order-info-page.module.css';

function OrderInfoPage() {
  const { modal }: any = useSelector((state) => state);

  return (
    <section className={`main ${style.section}`}>
      <OrderInfo order={modal.item} />
    </section>
  );
}

export default OrderInfoPage;
