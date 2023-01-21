import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './page-404.module.css';

function Page404() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section className={style.section}>
      <h2 className={`text_type_digits-large ${style.h2}`}>404</h2>
      <article className={style.article}>
        <p className="text_type_main-large text_color_inactive ">
          Запрашиваемая страница
          <span className="text_color_accent">
          &nbsp;
            {location.pathname}
          &nbsp;
          </span>
          не найдена
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => navigate('/')}
          extraClass={style.button}
        >
          Вернуться на главную
        </Button>
      </article>
    </section>
  );
}

export default Page404;
