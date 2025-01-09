import React from 'react';
import { useSelector } from 'react-redux';

import styles from './header.module.scss';
import { RootState } from '../../app/store';

const Header = () => {
  const { gameId, score, gold, lives, level } = useSelector((state: RootState) => state.game);

  return (
    <div className={styles.header}>
      <h1>Dragons of Mugloar</h1>
      {gameId && (
        <div>
          <span>Score: {score}</span> |<span> Gold: {gold}</span> |<span> Lives: {lives}</span> |
          <span> Level: {level}</span>
        </div>
      )}
    </div>
  );
};

export default Header;
