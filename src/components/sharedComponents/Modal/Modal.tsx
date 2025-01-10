import React from 'react';
import Modal from 'react-modal';

import styles from './modal.module.scss';

Modal.setAppElement('#root');

interface ModalComponentProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, children, onClose }) => {
  return (
    <div>
      <Modal isOpen={isOpen} className={styles.modalContent} overlayClassName={styles.modalOverlay}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
