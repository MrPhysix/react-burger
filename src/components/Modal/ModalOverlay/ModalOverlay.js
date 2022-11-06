import React from 'react';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

function ModalOverlay({ children, handleClose }) {
  const handleOverlayClick = (evt) => {
    evt.stopPropagation();
    const overlay = evt.target === evt.currentTarget;
    return overlay && handleClose();
  };

  return (
    <div role="presentation" className={style.overlay} onClick={handleOverlayClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
