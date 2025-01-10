import React from 'react';
import { useSelector } from 'react-redux';

import styles from './header.module.scss';
import { RootState } from '../../app/store';
import NavItems from '../../components/navItems/NavItems';

const Header = () => {
  const { gameId } = useSelector((state: RootState) => state.game);

  return (
    <div className={styles.header}>
      <div>
        <img src="/assets/images/logo.png" alt="Game Logo" className={styles.logo} />
      </div>
      {gameId && <NavItems />}
    </div>
  );
};

export default Header;
