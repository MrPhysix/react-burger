import React from 'react';
import { useSelector } from 'react-redux';
import style from './orders-stats.module.css';
import { TOrder } from '../../types';

type TStatsList = {
  list: Array<string>,
  done?: boolean,
}

type TOrdersCompleted = {
  title: string,
  count: number
}

function StatsList({ list, done }: TStatsList) {
  return (
    <div className={style.statsListFlex}>
      <h3 className="text text_type_main-medium mb-6">
        {done ? 'Готовы' : 'В процессе'}
        :
      </h3>
      <ul className={`${style.statsList} ${list.length > 9 && style.statsListTen}`}>
        {list?.map((item, i) => <li key={i} className={` ${done && style.statsListDone} text text_type_digits-default`}>{item}</li>)}
      </ul>
    </div>
  );
}

function OrdersCompleted({ title, count }: TOrdersCompleted) {
  return (
    <div>
      <h3 className="text text_type_main-medium">{title}</h3>
      <p className="digitsShadowGlow text text_type_digits-large">{count}</p>
    </div>
  );
}

function OrdersStats() {
  const { wsOrders }: any = useSelector((state) => state);
  const { orders, total, totalToday } = wsOrders;

  const doneOrders = orders.map((item: TOrder) => item.status === 'done' && item.number).slice(0, 22);
  const pendingOrders = orders.map((item: TOrder) => item.status === 'pending' && item.number);

  return (
    <section className={style.section}>
      <div className={style.board}>
        <StatsList list={doneOrders} done />
        <StatsList list={pendingOrders} />
      </div>
      <OrdersCompleted title="Выполнено за все время:" count={total} />
      <OrdersCompleted title="Выполнено за сегодня:" count={totalToday} />
    </section>
  );
}

export default OrdersStats;

StatsList.defaultProps = {
  done: null,
};
