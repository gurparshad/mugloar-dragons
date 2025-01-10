import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './gameOver.module.scss';
import { RootState } from '../../app/store';
import Button from '../../components/sharedComponents/button/Button';
import { resetGame } from '../../features/gameSlice';
import useStartGame from '../../hooks/useStartGame';
import { ApplicationRoutes } from '../../utils/constants';

const GameOver = () => {
  const startGameHandler = useStartGame();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { score } = useSelector((state: RootState) => state.game);

  const returnHomeHandler = () => {
    dispatch(resetGame());
    navigate(ApplicationRoutes.HOME);
  };

  return (
    <div className={styles.gameOverContainer}>
      <h2>Game over, You tried your best</h2>
      <h3>Your Final Score is: {score}</h3>
      <div className={styles.buttonContainer}>
        <Button title="Play Again" onClick={startGameHandler} />
        <Button title="Home" onClick={returnHomeHandler} />
      </div>
    </div>
  );
};

export default GameOver;
