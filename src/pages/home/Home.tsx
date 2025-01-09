import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './home.module.scss';
import Button from '../../components/sharedComponents/button/Button';
import { useStartGameMutation } from '../../features/apiSlice';
import { setError } from '../../features/errorSlice';
import { setGame } from '../../features/gameSlice';
import { ApplicationRoutes } from '../../utils/constants';
import { logError } from '../../utils/logger';

const Home = () => {
  const [startGame] = useStartGameMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGameStart = async () => {
    try {
      const result = await startGame().unwrap();
      dispatch(
        setGame({
          gameId: result.gameId,
          score: 0,
          gold: 0,
          lives: 3,
          level: 0,
        })
      );
      navigate(ApplicationRoutes.ADS);
    } catch (err) {
      const errorMessage = 'Failed to start the game';
      logError(errorMessage, err, 'Home - handleGameStart');
      dispatch(setError('Failed to start the game. Please try again.'));
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Are you ready to play?</h1>
      <p className={styles.subheading}>
        Click the button below to start the game and embark on your journey!
      </p>
      <div className={styles.rulesContainer}>
        <h3 className={styles.rulesHeading}>Rules</h3>
        <ul className={styles.rulesList}>
          <li>The tasks have different difficulty levels.</li>
          <li>As you complete tasks, you will earn gold.</li>
          <li>You can use the gold to purchase items from the shop to help you level up.</li>
          <li>Some tasks are green (easier), while others are red (more difficult).</li>
          <li>You might fail to complete the red tasks as they are much harder than green ones.</li>
          <li>
            Earn gold and level up! At certain levels, red cards will automatically turn green.
          </li>
        </ul>
      </div>
      <Button onClick={handleGameStart} title="Start Game" className={styles.startGameButton} />
      <div className={styles.flame} />
    </div>
  );
};

export default Home;
