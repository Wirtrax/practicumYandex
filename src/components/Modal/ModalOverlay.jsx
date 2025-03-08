import React from 'react';
import styles from "./Modal.module.css";

function ModalOverlay({ onClose, children}) {
  return <div className={styles.overlay} onClick={onClose}>
    {children}
  </div>;
}

export default ModalOverlay;