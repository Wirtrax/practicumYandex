import React from 'react';
import styles from "./Modal.module.css";

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children }) => {
  return <div className={styles.overlay} onClick={onClose}>
    {children}
  </div>;
}

export default ModalOverlay;