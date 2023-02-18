import React from 'react';
import OrdersFeed from '../../components/OrdersFeed/OrdersFeed';
import style from './orders-feed-page.module.css';
import OrdersStats from '../../components/OrdersStats/OrdersStats';

function OrdersFeedPage() {
  return (
    <section className={`main ${style.section}`}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={style.flex}>
        <OrdersFeed />
        <OrdersStats />
      </div>
    </section>
  );
}

export default OrdersFeedPage;
