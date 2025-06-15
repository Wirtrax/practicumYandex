import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './SideBarStyle.module.css';
import { useDispatch } from "react-redux";
import { logout } from '../../services/actions/refreshTokenAction';
import { useState } from 'react';

function SideBar({info}) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Вы уверены, что хотите выйти?');

        if (isConfirmed) {
            dispatch(logout(navigate));
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? (
                    <div className={styles.closeIcon}>×</div>
                ) : (
                    <div className={styles.menuIcon}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                    </div>
                )}
            </div>

            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.visible : ''}`} onClick={toggleMobileMenu}>
                <div className={`${styles.mobileMenuContent} ${isMobileMenuOpen ? styles.slideIn : ''}`} onClick={(e) => e.stopPropagation()}>
                    <aside className={styles.sideBarMobile}>
                        <nav className='pb-20'>
                            <p className={ location.pathname === '/profile' ? 'text text_type_main-medium ':'text text_type_main-medium text_color_inactive'}>
                                <Link to='/profile' onClick={toggleMobileMenu}>Профиль</Link>
                            </p>
                            <p className={ location.pathname === '/profile/orders' ? 'text text_type_main-medium ':'text text_type_main-medium text_color_inactive'}>
                                <Link to='/profile/orders' onClick={toggleMobileMenu}>История заказов</Link>
                            </p>
                            <p className={'text text_type_main-medium text_color_inactive'} onClick={handleSubmit}>
                                Выход
                            </p>
                        </nav>
                        <p className="text text_type_main-default text_color_inactive">
                            В этом разделе вы можете
                            изменить свои персональные данные
                        </p>
                    </aside>
                </div>
            </div>

            <aside className={styles.sideBar}>
                <nav className='pb-20'>
                    <p className={ location.pathname === '/profile' ? 'text text_type_main-medium ':'text text_type_main-medium text_color_inactive'}>
                        <Link to='/profile'>Профиль</Link>
                    </p>
                    <p className={ location.pathname === '/profile/orders' ? 'text text_type_main-medium ':'text text_type_main-medium text_color_inactive'}>
                        <Link to='/profile/orders'>История заказов</Link>
                    </p>
                    <p className="text text_type_main-medium text_color_inactive" onClick={handleSubmit}>
                        Выход
                    </p>
                </nav>
                <p className="text text_type_main-default text_color_inactive">
                    {info}
                </p>
            </aside>
        </>
    );
}

export default SideBar;