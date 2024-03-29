import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './profile-layout.module.css';
import { useAuth } from '../../../utils/api/auth';

const classNames = ({ isActive }: { isActive: boolean }) => `text text_type_main-medium text_color_inactive ${style.link} ${isActive && style.linkActive} `;

interface IActions {
  text: string;
  path: string;
  note?: string;
}

const actions: Array<IActions> = [
  {
    text: 'Профиль',
    path: '/profile',
    note: 'В этом разделе вы можете изменить свои персональные данные',
  },
  {
    text: 'История заказов',
    path: '/profile/orders',
  },
  {
    text: 'Выход',
    path: '/',
  },
];

function ProfileLayout({ children } : {children: any}) {
  const { signOut }: any = useAuth();

  return (
    <main className={`main ${style.profile}`}>
      <nav className={style.nav}>
        {actions?.slice(0, 2).map((item) => (
          <NavLink
            key={item.text}
            className={classNames}
            to={item?.path}
            end
          >
            {item?.text}
          </NavLink>
        ))}
        <button
          type="button"
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          onClick={(evt: React.SyntheticEvent) => {
            evt.preventDefault();
            signOut();
          }}
        >
          {actions[2].text}
        </button>
        <p className="mt-20 text text_type_main-default text_color_inactive" style={{ opacity: '.4', width: '320px' }}>
          {actions[0].note}
        </p>
      </nav>
      {children}
    </main>

  );
}

export default ProfileLayout;
