import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { RootState } from './app/store';
import styles from './app.module.scss';
import Button from './components/sharedComponents/button/Button';
import ModalComponent from './components/sharedComponents/Modal/Modal';
import { clearError } from './features/errorSlice';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  const { errorMessage } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();

  const closeErrorModal = () => {
    dispatch(clearError());
  };
  return (
    <>
      <ModalComponent isOpen={!!errorMessage} onClose={closeErrorModal}>
        <div className={styles.errorContainer}>
          <div className={styles.errorText}>
            <h3>Error</h3>
            <p>{errorMessage}</p>
          </div>
          <Button onClick={closeErrorModal} title="Close" />
        </div>
      </ModalComponent>

      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;
