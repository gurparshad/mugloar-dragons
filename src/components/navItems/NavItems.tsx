import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './navItems.module.scss';
import { resetGame } from '../../features/gameSlice';
import { ApplicationRoutes } from '../../utils/constants';
import Button from '../sharedComponents/button/Button';

const NavItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGameQuit = () => {
    dispatch(resetGame());
    navigate(ApplicationRoutes.HOME);
  };

  return (
    <div className={styles.navItems}>
      <Button
        onClick={() => navigate(ApplicationRoutes.SHOP)}
        title="Shop"
        className={styles.navButton}
      />
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
