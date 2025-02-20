import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './AppHeaderStyle.module.css';

function HeaderButton({ Icon, type, name }) {
  return (
    <div className={style.headerButton}>
      <Icon type={type} />
      <span className="text text_type_main-default">{name}</span>
    </div>
  );
}

function AppHeader() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.header__order}>
          <HeaderButton Icon={BurgerIcon} type="primary" name="Конструктор" />
          <HeaderButton Icon={ListIcon} type="secondary" name="Лента заказов" />
        </div>
        <Logo />
        <div className={style.header__profile}>
          <HeaderButton Icon={ProfileIcon} type="secondary" name="Личный кабинет" />
        </div>
      </header>
    </div>
  )
}


export default AppHeader;