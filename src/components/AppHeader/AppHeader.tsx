import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, MenuIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './AppHeaderStyle.module.css';

import logoPhoneV from './imgForPhone/logo.png'

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

const BurgerMenuContent: React.FC<{ onItemClick: () => void }> = ({ onItemClick }) => {
  const location = useLocation();

  return (
    <div className={style.burgerMenuContent}>
      <Link to='/' onClick={onItemClick}>
        <HeaderButton
          Icon={BurgerIcon}
          type={location.pathname === '/' ? "primary" : "secondary"}
          name="Конструктор"
        />
      </Link>
      <Link to='/feed' onClick={onItemClick}>
        <HeaderButton
          Icon={ListIcon}
          type={location.pathname === '/feed' ? "primary" : "secondary"}
          name="Лента заказов"
        />
      </Link>
      <Link to='/profile' onClick={onItemClick}>
        <HeaderButton
          Icon={ProfileIcon}
          type={location.pathname.startsWith('/profile') ? "primary" : "secondary"}
          name="Личный кабинет"
        />
      </Link>
    </div>
  );
};

const AppHeader: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={style.container}>
      {isMenuOpen ? <div className={style.overlay} onClick={closeMenu}></div> : null}
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
        <div className={style.burger} onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon type="primary" /> : <MenuIcon type="primary" />}
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
        <div className={style.header__logoPhoneV}>
          <img src={logoPhoneV} alt="logo" />
        </div>

        <div className={`${style.burgerMenu} ${isMenuOpen ? style.burgerMenuOpen : ''}`}>
          <BurgerMenuContent onItemClick={toggleMenu} />
        </div>
      </header>
    </div>
  );
};

export default AppHeader;