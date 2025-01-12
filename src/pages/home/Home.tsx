import styles from './home.module.scss';
import Button from '../../components/sharedComponents/button/Button';
import useStartGame from '../../hooks/useStartGame';

const Home = () => {
  const startGameHandler = useStartGame();
  return (
    <div className={styles.homeContainer}>
      <img src="/assets/images/dragonsOfMugloar.png" alt="dragons" className={styles.heroImage} />
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
      <Button onClick={startGameHandler} title="Start Game" className={styles.startGameButton} />
    </div>
  );
};

export default Home;
