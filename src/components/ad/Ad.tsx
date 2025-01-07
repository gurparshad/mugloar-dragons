import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './ad.module.scss';
import { RootState } from '../../app/store';
import { ApplicationRoutes } from '../../utils/constants';
import { getGameLevelCode } from '../../utils/helpers';
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
      <Button onClick={() => handleAdClick(probability)} title="Play Now" />
      <ModalComponent isOpen={isModalOpen}>
        <div className={styles.modalContent}>
          <Button onClick={() => setModalOpen(false)} title="Close" />
          {/* @ts-ignore */}
          {levelCode > game.level ? (
            <>
              <h3 className={styles.modalMessage}>
                You are at level {game.level} which is not sufficient for this task of level{' '}
                {levelCode}. Please Upgrade
              </h3>
              <Button onClick={() => navigate(ApplicationRoutes.SHOP)} title="Upgrade" />
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
