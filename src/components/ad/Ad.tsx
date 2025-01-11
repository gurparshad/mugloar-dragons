import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './ad.module.scss';
import { RootState } from '../../app/store';
import { ApplicationRoutes } from '../../utils/constants';
import { decodeBase64, getGameLevelCode } from '../../utils/helpers';
import Button from '../sharedComponents/button/Button';
import ModalComponent from '../sharedComponents/Modal/Modal';

interface AdProps {
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
  handlePlay: () => void;
}

const Ad: React.FC<AdProps> = ({ message, reward, expiresIn, probability, handlePlay }) => {
  const game = useSelector((state: RootState) => state.game);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [levelCode, setLevelCode] = useState<number | null>(0);

  // const decodedMessage = decodeBase64(message);
  const decodedProbability = decodeBase64(probability);

  const handleAdClick = (adProbability: string) => {
    setModalOpen(true);
    setLevelCode(getGameLevelCode(adProbability));
  };

  const handleClickPlay = () => {
    setModalOpen(false);
    handlePlay();
  };

  // @ts-ignore
  const isLevelSufficient = game.level >= getGameLevelCode(probability);
  // check please it might be possible that the decoded ads are corrupted and user cant play them. i am getting error on click on them.

  return (
    <div className={`${styles.ad} ${isLevelSufficient ? styles.adSuccess : styles.adFailure}`}>
      <h3 className={styles.adMessage}>{message}</h3>
      <div className={styles.adDetails}>
        <p>
          🎁 Reward: <span>{reward}</span>
        </p>
        <p>
          🗓️ Expires In: <span>{expiresIn} Turns</span>
        </p>
        <p>
          🎲 Probability: <span>{probability}</span>
        </p>
      </div>
      <Button
        onClick={() => handleAdClick(decodedProbability)}
        title="Play Now"
        styleType={isLevelSufficient ? 'success' : 'failure'}
      />
      <ModalComponent isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modalContent}>
          <Button onClick={() => setModalOpen(false)} title="Go Back" />

          {/* @ts-ignore */}
          {levelCode > game.level ? (
            <>
              <h3 className={styles.modalMessage}>
                You are at level {game.level} which is not sufficient for this task of level{' '}
                {levelCode}. Please Upgrade
              </h3>
              <div className={styles.buttonContainer}>
                <Button onClick={() => navigate(ApplicationRoutes.SHOP)} title="Upgrade" />
                <Button onClick={handleClickPlay} title="Play Anyway" />
              </div>
            </>
          ) : (
            <Button onClick={handleClickPlay} title="Play Now" />
          )}
        </div>
      </ModalComponent>
    </div>
  );
};

export default Ad;
