import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import style from './order-feed.module.css';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrdersStats from '../../components/OrdersStats/OrdersStats';
import { openModal, resetModalInfo, setModalInfo } from '../../services/reducers/modal';
import Modal from '../../components/Modal/Modal';
import OrderInfo from '../../components/Modal/OrderInfo/OrderInfo';

const arr = [
  {
    title: 'Флюоресцентная булка R2-D3',
    img: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    price: 480,
  },
  {
    title: 'Филе Люминесцентного тетраодонтимформа',
    img: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    price: 480,
  },
  {
    title: 'Соус традиционный галактический',
    img: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    price: 480,
  },
  {
    title: 'Плоды фалленианского дерева',
    img: 'https://code.s3.yandex.net/react/code/cheese-large.png',
    price: 480,
  },
  {
    title: 'Соус традиционный галактический',
    img: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    price: 480,
  },
  {
    title: 'Флюоресцентная булка R2-D3',
    img: 'https://code.s3.yandex.net/react/code/cheese-large.png',
    price: 480,
  },
  {
    title: 'Филе Люминесцентного тетраодонтимформа',
    img: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    price: 480,
  },
  {
    title: 'Плоды фалленианского дерева',
    img: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    price: 480,
  },
];

const order = {
  number: 34535,
  date: 'Сегодня, 16:20',
  title: 'Death Star Starship Main бургер',
  status: 'Создан',
  ingredients: arr,
};

function OrderFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modal }: any = useSelector((state) => state);
  // handlers
  const handleDetailsModal = (): void => {
    dispatch(setModalInfo(order));
    dispatch(openModal());
  };

  const handleDetailsModalClose = (): void => {
    dispatch(resetModalInfo());
    navigate(-1);
  };

  return (
    <>
      {modal.item && modal.isOpen && (
        <Modal handleClose={handleDetailsModalClose}>
          <OrderInfo order={modal.item} />
        </Modal>
      )}
      <section className={`main ${style.section}`}>
        <h2 className="text text_type_main-large">Лента заказов</h2>
        <div className={style.flex}>
          <ul className={`${style.ul} scroll`}>
            <OrderCard
              order={order}
              onOrderClick={handleDetailsModal}
            />
            <OrderCard
              order={order}
              onOrderClick={handleDetailsModal}
            />
            <OrderCard
              order={order}
              onOrderClick={handleDetailsModal}
            />
            <OrderCard
              order={order}
              onOrderClick={handleDetailsModal}
            />
          </ul>
          <OrdersStats />
        </div>
      </section>
    </>
  );
}

export default OrderFeed;
