import React from 'react';
//
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import HeaderLink from './HeaderLink/HeaderLink';

function Header() {
  const style = {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    nav: {
      display: 'flex',
      flex: '1',
    },
  };

  return (
    <header style={style.header}>
      <nav style={style.nav}>
        <HeaderLink text="Конст руктор" selected><BurgerIcon type="primary" /></HeaderLink>
        <HeaderLink text="Лента заказов"><ListIcon type="secondary" /></HeaderLink>
      </nav>
      <Logo />
      <nav style={{ ...style.nav, justifyContent: 'end' }}>
        <HeaderLink text="Личный кабинет"><ProfileIcon type="secondary" /></HeaderLink>
      </nav>
    </header>
  );
}

export default Header;
