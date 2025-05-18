import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './AppHeaderStyle.module.css';

type THeaderButtonProps = {
  Icon: React.ComponentType<{ type: 'primary' | 'secondary' }>;
  type: 'primary' | 'secondary';
  name: string;
};

const HeaderButton: React.FC<THeaderButtonProps> = ({ Icon, type, name }) => {
  return (
    <div className={style.headerButton}>
      <Icon type={type} />
      <span className="text text_type_main-default">{name}</span>
    </div>
  );
};

const AppHeader: React.FC = () => {
  const location = useLocation();

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.header__order}>
          <Link to='/'>
            <HeaderButton
              Icon={BurgerIcon}
              type={location.pathname === '/' ? "primary" : "secondary"}
              name="Конструктор"
            />
          </Link>
          <Link to='/feed'>
            <HeaderButton
              Icon={ListIcon}
              type={location.pathname === '/feed' ? "primary" : "secondary"}
              name="Лента заказов"
            />
          </Link>
        </div>
        <Link to='/'>
          <Logo />
        </Link>
        <div className={style.header__profile}>
          <Link to='/profile'>
            <HeaderButton
              Icon={ProfileIcon}
              type={location.pathname.startsWith('/profile') ? "primary" : "secondary"}
              name="Личный кабинет"
            />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;