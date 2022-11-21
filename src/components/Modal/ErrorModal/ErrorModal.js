import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ErrorIcon from './ErrorIcon/ErrorIcon';
import style from './error-modal.module.css';
import Modal from '../Modal';

function ErrorModal({ handleClose }) {
  return (
    <div className={style.error}>
      <ErrorIcon />
      <p className="text text_type_main-medium">Перезагрузите страницу</p>
      <Button type="primary" size="medium" htmlType="button" onClick={handleClose}>Закрыть и перегрузить</Button>
    </div>
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ErrorModal;
