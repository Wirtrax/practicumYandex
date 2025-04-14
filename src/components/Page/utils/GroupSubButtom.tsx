import React from 'react'
import styles from './util.module.css'

interface GroupSubButtonProps {
    children: React.ReactNode;
}

const GroupSubButton: React.FC<GroupSubButtonProps> = ({ children }) => {
    return (
        <div className={styles.groupSubButtom}>
            {children}
        </div>
    )
}

export default GroupSubButton