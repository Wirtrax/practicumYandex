import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './util.module.css'

interface FormGroupProps {
    children: React.ReactNode;
    buttonName: string;
    onSubmit: (e: React.FormEvent) => void;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, buttonName, onSubmit }) => {
    return (
        <form action="#" className={`pb-20 pt-6 ${styles.loginForm}`} onSubmit={onSubmit}>
            {children}
            <Button htmlType="submit" type="primary" size="large">
                {buttonName}
            </Button>
        </form>
    )
}

export default FormGroup