import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './profile-nav.module.css';

const classNames = ({ isActive }) => `text text_type_main-medium text_color_inactive ${style.link} ${isActive && style.linkActive}`;

const actions = [
  {
    text: 'Профиль',
    path: '/profile',
    note: 'В этом разделе вы можете изменить свои персональные данные',
  },
  {
    text: 'История заказов',
    path: '/ff',
  },
  {
    text: 'Выход',
    path: '/',
  },
];

function ProfileNav() {
  return (
    <nav className={style.nav}>
      {actions?.map((item) => (
        <NavLink
          key={item.text}
          className={classNames}
          to={item?.path}
        >
          {item?.text}
        </NavLink>
      ))}
      <p className="mt-20 text text_type_main-default text_color_inactive" style={{ opacity: '.4' }}>
        {actions[0].note}
      </p>
    </nav>
  );
}

export default ProfileNav;
