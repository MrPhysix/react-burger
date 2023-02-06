import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from '../../components/Modal/OrderInfo/OrderInfo';

import style from './order-info-page.module.css';
import { getOrderInfoById } from '../../utils/api/order';
import { Loader } from '../../components/App/App';

function OrderInfoPage() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    getOrderInfoById(orderId)
      .then((res: any) => {
        console.log('res', res);
        setOrder(res.orders[0]);
      });
  }, [orderId]);

  useEffect(() => {
    console.log(order);
  }, [order]);

  if (!order) return <Loader />;

  return (
    <section className={`main ${style.section}`}>
      <OrderInfo order={order} />
    </section>
  );
}

export default OrderInfoPage;
