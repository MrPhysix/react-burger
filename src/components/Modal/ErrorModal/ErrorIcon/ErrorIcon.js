import React from 'react';

import style from './error-icon.module.css';

function ErrorIcon() {
  return (
    <div className={style.icon}>
      <div className={style.circle} />
      <p className={`${style.sign} text text_type_digits-large`}>&#33;</p>
    </div>
  );
}

export default ErrorIcon;
