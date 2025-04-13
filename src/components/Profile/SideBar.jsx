import { useNavigate } from 'react-router-dom';
import styles from './SideBarStyle.module.css'
import { useDispatch } from "react-redux";
import { logout } from '../../services/actions/refreshTokenAction';

function SideBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Вы уверены, что хотите выйти?');

        if (isConfirmed) {
            dispatch(logout(navigate));
        }
    };
    return (
        <aside className={styles.sideBar}>
            <nav className='pb-20'>
                <p className="text text_type_main-medium" >
                    Профиль
                </p>
                <p className="text text_type_main-medium text_color_inactive" >
                    История заказов
                </p>
                <p className="text text_type_main-medium text_color_inactive" onClick={handleSubmit}  >
                    Выход
                </p>
            </nav>
            <p className="text text_type_main-default text_color_inactive">
                В этом разделе вы можете
                изменить свои персональные данные
            </p>
        </aside>
    )
}

export default SideBar
