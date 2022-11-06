import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ErrorIcon from './ErrorIcon/ErrorIcon';
import style from './error-modal.module.css';

function ErrorModal({ handleClose }) {
  return (
    <div className={style.error}>
      <ErrorIcon />
      <p className="text text_type_main-medium">Перезагрузите страницу</p>
      <Button type="primary" size="medium" htmlType="button" onClick={handleClose}>Закрыть и перегрузить</Button>
    </div>
  );
}

export default ErrorModal;
