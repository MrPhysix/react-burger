import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
import { resetModalInfo } from '../../../services/reducers/modal';

import style from './profile-orders.module.css';
import Modal from '../../../components/Modal/Modal';
import OrderInfo from '../../../components/Modal/OrderInfo/OrderInfo';
import OrdersFeed from '../../../components/OrdersFeed/OrdersFeed';
import { RootState, useAppDispatch } from '../../../services';

function ProfileOrders() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { modal } = useSelector((state: RootState) => state);
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
