import { FC } from 'react';
import styles from './Loader.module.css';

const Loader: FC = () => {
    return (
        <div className={styles.overlay} data-testid="loader">
            <div className={styles.loaderContainer}>
                <div className={styles.loader}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                </div>
                <p className={`text text_type_main-default mt-10 ${styles.text}`}>Загрузка...</p>
            </div>
        </div>
    );
};

export default Loader;