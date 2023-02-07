import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './orders-feed.module.css';
import OrderCard from '../OrderCard/OrderCard';
import { resetModalInfo } from '../../services/reducers/modal';
import Modal from '../Modal/Modal';
import OrderInfo from '../Modal/OrderInfo/OrderInfo';
import { wsOrdersActions } from '../../services/reducers/wsOrders';
import { WS_ORDERS_URL } from '../../utils/const';
import { TOrder } from '../../types';
import { getCookie } from '../../utils/cookie';
import { RootState, useAppDispatch } from '../../services';

function OrdersFeed() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //
  const { wsStart, wsClose } = wsOrdersActions;
  const { wsOrders, modal } = useSelector((state: RootState) => state);
  const { orders } = wsOrders;

  const profileOrdersPage = location.pathname.includes('/profile/orders');
  // handlers

  // @ts-ignore
  // Array.prototype.modify = function () {
  //   return profileOrdersPage ? this.reverse() : this;
  // };
  const handleDetailsModalClose = (): void => {
    dispatch(resetModalInfo());
    navigate(-1);
  };

  // effects
  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      dispatch(wsStart(`${WS_ORDERS_URL}/all`));
    } else if (profileOrdersPage) {
      const accessToken = getCookie('accessToken');
      dispatch(wsStart(`${WS_ORDERS_URL}?token=${accessToken}`));
    }
    return () => {
      dispatch(wsClose());
    };
  }, []);

  return (
    <>
      {modal.item && modal.isOpen && (
        <Modal handleClose={handleDetailsModalClose}>
          <OrderInfo order={modal.item} />
        </Modal>
      )}
      <ul className={`${style.ul} ${orders?.length > 4 && 'scroll'}`}>
        {
          // eslint-disable-next-line
          orders.length > 0
            ? profileOrdersPage
              ? orders.map((item: TOrder, i: number) => (
                <OrderCard
                  key={item._id + i}
                  order={item}
                />
              )).reverse()
              : orders.map((item: TOrder, i: number) => (
                <OrderCard
                  key={item._id + i}
                  order={item}
                />
              ))
            : <p className="text text_type_main-large text_color_inactive">Заказов нет</p>
            }
      </ul>
    </>
  );
}

export default OrdersFeed;
