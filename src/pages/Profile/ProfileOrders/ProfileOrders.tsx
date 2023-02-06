import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
import { resetModalInfo } from '../../../services/reducers/modal';

import style from './profile-orders.module.css';
import Modal from '../../../components/Modal/Modal';
import OrderInfo from '../../../components/Modal/OrderInfo/OrderInfo';
import OrdersFeed from '../../../components/OrdersFeed/OrdersFeed';

function ProfileOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modal }: any = useSelector((state) => state);
  // handlers
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
      <ProfileLayout>
        <div className={style.ul}>
          <OrdersFeed />
        </div>
      </ProfileLayout>
    </>
  );
}

export default ProfileOrders;
