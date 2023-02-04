import React from 'react';
import style from './orders-stats.module.css';

type TStatsList = {
  list: Array<string>,
  done?: boolean,
}

type TOrdersComplited = {
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
        {list?.map((item, i) => <li className={` ${done && style.statsListDone} text text_type_digits-default`}>{item}</li>)}
      </ul>
    </div>
  );
}

function OrdersComplited({ title, count }: TOrdersComplited) {
  return (
    <div>
      <h3 className="text text_type_main-medium">{title}</h3>
      <p className="digitsShadowGlow text text_type_digits-large">{count}</p>
    </div>
  );
}

function OrdersStats() {
  const arr: Array<string> = ['034533', '034533',
    '034533', '034533', '034533',
    '034533', '034533', '999999'];

  return (
    <section className={style.section}>
      <div className={style.board}>
        <StatsList list={arr} done />
        <StatsList list={arr} />
      </div>
      <OrdersComplited title="Выполнено за все время:" count={28752} />
      <OrdersComplited title="Выполнено за сегодня:" count={138} />
    </section>
  );
}

export default OrdersStats;

StatsList.defaultProps = {
  done: null,
};
