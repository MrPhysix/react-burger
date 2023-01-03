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
    path: '/',
  },
  {
    text: 'Выход',
    path: '/',
  },
];

function ProfileNav() {
  // const [current, setCurrent] = useState(true);
  //
  // const handleClick = (type) => {
  //   setCurrent(type);
  // };

  return (
    <nav className={style.nav}>
      {actions?.map((item) => (
        <NavLink
          key={item.path}
          className={classNames}
          to={item?.path}
          active
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
