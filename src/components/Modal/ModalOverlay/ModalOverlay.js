import React from 'react';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

function ModalOverlay({ handleClose }) {
  return (
    <div role="presentation" className={style.overlay} onClick={handleClose} />
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
