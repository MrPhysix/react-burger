import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './order-feed.module.css';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrdersStats from '../../components/OrdersStats/OrdersStats';
import { openModal, resetModalInfo, setModalInfo } from '../../services/reducers/modal';
import Modal from '../../components/Modal/Modal';
import OrderInfo from '../../components/Modal/OrderInfo/OrderInfo';
import { wsOrdersActions } from '../../services/reducers/wsOrders';
import { WS_ALL_ORDERS_URL } from '../../utils/const';
import { TOrder } from '../../types';

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
  const location = useLocation();
  //
  const { wsStart, wsClose } = wsOrdersActions;
  const { wsOrders }: any = useSelector((state) => state);
  const { orders } = wsOrders;

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

  // effects

  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      console.log('yes');
      dispatch(wsStart(WS_ALL_ORDERS_URL));
    }
    return () => {
      console.log('no');
      dispatch(wsClose());
    };
  }, [location]);

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
            {
              orders && orders.map((item: TOrder) => (
                <OrderCard
                  order={item}
                  onOrderClick={handleDetailsModal}
                />
              ))
            }
          </ul>
          <OrdersStats />
        </div>
      </section>
    </>
  );
}

export default OrderFeed;
