import React, {useState} from "react";
import Modal from "react-modal";
import Button from "../button/Button";
import styles from "./ModalComponent.module.css"; // import the module.css file

Modal.setAppElement("#root");

const ModalComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button title="Open Modal" onClick={openModal} />

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="My Modal"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        closeTimeoutMS={300}
      >
        <h2>Modal Title</h2>
        <p>This is a sample modal content</p>
        <Button title="Close" onClick={closeModal} />
      </Modal>
    </div>
  );
};

export default ModalComponent;
