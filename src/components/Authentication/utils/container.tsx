import React from 'react'
import styles from './util.module.css'

interface ContainerProps {
    title: string;
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ title, children }) => {
    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium pb-6">{title}</h2>
            {children}
        </div>
    )
}

export default Container