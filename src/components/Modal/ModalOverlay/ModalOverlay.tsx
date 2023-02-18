import React from 'react';
import style from './modal-overlay.module.css';

interface IModalOverlay {
  handleClose: Function
}

function ModalOverlay({ handleClose }: IModalOverlay) {
  return (
    <div
      role="presentation"
      className={style.overlay}
      onClick={handleClose as (evt: React.MouseEvent<HTMLElement>) => void}
    />
  );
}

export default ModalOverlay;
