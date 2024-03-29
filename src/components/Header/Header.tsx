import React from 'react';
//
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import { NavLink } from 'react-router-dom';
import style from './header.module.css';

const linkClassNames = ({ isActive }: { isActive: boolean }) => `text_type_main-small pl-5 pr-5 pt-4 pb-4 no-select ${style.link} ${isActive && style.linkActive}`;
const iconClassNames = (isActive: boolean) => (isActive ? 'primary' : 'secondary');
const textClassNames = (isActive: boolean) => `ml-2 ${!isActive && 'text_color_inactive'}`;

type TSections = Array<{
  text: string;
  path: string;
}>

const sections: TSections = [
  {
    text: 'Конструктор',
    path: '/',
  },
  {
    text: 'Лента заказов',
    path: '/feed',
  },
  {
    text: 'Личный кабинет',
    path: '/profile',
  },
];

function Header() {
  return (
    <header className={`mt-2 pt-4 pb-4 ${style.header}`}>
      <nav className={style.nav}>
        <NavLink
          to={sections[0].path}
          className={linkClassNames}
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={iconClassNames(isActive)} />
              <span className={textClassNames(isActive)}>{sections[0].text}</span>
            </>
          )}
        </NavLink>
        <NavLink
          to={sections[1].path}
          className={linkClassNames}
        >
          {({ isActive }) => (
            <>
              <ListIcon type={iconClassNames(isActive)} />
              <span className={textClassNames(isActive)}>{sections[1].text}</span>
            </>
          )}
        </NavLink>
      </nav>

      <NavLink to="/"><Logo /></NavLink>

      <nav className={`${style.nav} + ${style.justify__end}`}>
        <NavLink
          to={sections[2].path}
          className={linkClassNames}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={iconClassNames(isActive)} />
              <span className={textClassNames(isActive)}>{sections[2].text}</span>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
