import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './navItems.module.scss';
import { resetGame } from '../../features/gameSlice';
import { ApplicationRoutes } from '../../utils/constants';
import Button from '../sharedComponents/button/Button';

const NavItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleGameQuit = () => {
    dispatch(resetGame());
    navigate(ApplicationRoutes.HOME);
  };

  return (
    <div className={styles.navItems}>
      {location.pathname === ApplicationRoutes.SHOP ? (
        <Button title="Back to Game" onClick={() => navigate(ApplicationRoutes.ADS)} />
      ) : (
        <Button
          onClick={() => navigate(ApplicationRoutes.SHOP)}
          title="Shop"
          className={styles.navButton}
        />
      )}

      <Button
        onClick={handleGameQuit}
        title="Quit"
        styleType="failure"
        className={styles.navButton}
      />
    </div>
  );
};

export default NavItems;
