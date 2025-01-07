import React from "react";
import Modal from "react-modal";
import styles from "./modal.module.scss";

Modal.setAppElement("#root");

interface ModalComponentProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({isOpen, children}) => {
  return (
    <div>
      <Modal isOpen={isOpen} className={styles.modalContent} overlayClassName={styles.modalOverlay}>
        {children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
