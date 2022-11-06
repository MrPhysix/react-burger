import React from 'react';
//
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import style from './header.module.css';
import HeaderLink from './HeaderLink/HeaderLink';

function Header() {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <HeaderLink link="#" text="Конструктор" selected><BurgerIcon type="primary" /></HeaderLink>
        <HeaderLink link="#" text="Лента заказов"><ListIcon type="secondary" /></HeaderLink>
      </nav>
      <Logo />
      <nav className={`${style.nav} + ${style.justify__end}`}>
        <HeaderLink link="#" text="Личный кабинет"><ProfileIcon type="secondary" /></HeaderLink>
      </nav>
    </header>
  );
}

export default Header;
