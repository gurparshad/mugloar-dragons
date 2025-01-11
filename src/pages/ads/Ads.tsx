import React, { useEffect, useState } from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './ads.module.scss';
import { RootState } from '../../app/store';
import Ad from '../../components/ad/Ad';
import Button from '../../components/sharedComponents/button/Button';
import LoadingSpinner from '../../components/sharedComponents/loadingSpinner/LoadingSpinner';
import ModalComponent from '../../components/sharedComponents/Modal/Modal';
import { useFetchAdsQuery, useSolveAdMutation } from '../../features/apiSlice';
import { updateStats } from '../../features/gameSlice';
import useErrorHandler from '../../hooks/useErrorHandler';
import { ApplicationRoutes, Levels } from '../../utils/constants';
import { decodeBase64 } from '../../utils/helpers';

interface AdData {
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
}

const Ads: React.FC = () => {
  const { gameId, score, gold, lives, level } = useSelector((state: RootState) => state.game);
  const handleError = useErrorHandler();
  const { data, isLoading, error, refetch } = useFetchAdsQuery(gameId || '');
  const [solveAd] = useSolveAdMutation();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isMissionSuccess, setMissionSuccess] = useState<boolean>(false);
  const [sortedAds, setSortedAds] = useState<AdData[] | null>(null);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<{ key: string; order: string }>({
    key: 'reward',
    order: 'ascending',
  });
  const dispatch = useDispatch();

  const handlePlay = async (adId: string) => {
    if (!gameId) {
      const errorMessage = 'Game ID is required to solve an ad.';
      const errorDetails = new Error(errorMessage);
      handleError(errorMessage, errorDetails, 'useStartGame - startGameHandler');
      return;
    }
    try {
      const decodedAdId = decodeBase64(adId);
      console.log('adId-->>', adId);
      console.log('decodedAdId-->>', decodedAdId);
      const response = await solveAd({ gameId, adId: decodedAdId }).unwrap();
      if (response.success) {
        dispatch(
          updateStats({
            score: response.score,
            gold: response.gold,
            lives: response.lives,
          })
        );
        setMissionSuccess(true);
        setModalOpen(true);
      } else {
        dispatch(
          updateStats({
            lives: response.lives,
          })
        );
        setMissionSuccess(false);
        setModalOpen(true);
      }
      if (response.lives > 0) {
        refetch();
      } else {
        navigate(ApplicationRoutes.GAME_OVER);
      }
    } catch (err) {
      const errorMessage = 'Failed to solve the ad:';
      handleError(errorMessage, err, 'Ads - handlePlay, solveAd');
    }
  };
  const applySorting = (ads: AdData[], config: { key: string; order: string }) => {
    const sorted = [...ads].sort((a, b) => {
      let valueA: number | string = a[config.key as keyof AdData];
      let valueB: number | string = b[config.key as keyof AdData];

      if (config.key === 'probability') {
        valueA = Levels.find((level) => level.probability === valueA)?.value ?? 0;
        valueB = Levels.find((level) => level.probability === valueB)?.value ?? 0;
      }

      if (config.order === 'ascending') {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      }

      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
      return 0;
    });

    setSortedAds(sorted);
  };

  const handleSort = (key: string, order: string) => {
    setSortConfig({ key, order });
  };

  useEffect(() => {
    if (data) {
      applySorting(data, sortConfig);
    }
  }, [data, sortConfig]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading ads.Please try again later</p>;

  return (
    <div>
      <div className={styles.gameStatsAndScoreWrapper}>
        {gameId && (
          <div className={styles.scoreCard}>
            <span>Score: {score}</span> |<span> Gold: {gold}</span> |<span> Lives: {lives}</span> |
            <span> Level: {level}</span>
          </div>
        )}
        <div className={styles.sortContainer}>
          <div className={styles.sortKey}>
            <label className={styles.label} htmlFor="sortKey">
              Sort By:
            </label>
            <select
              id="sortKey"
              value={sortConfig.key}
              className={styles.select}
              onChange={(e) => handleSort(e.target.value, sortConfig.order)}
            >
              <option value="reward">Reward</option>
              <option value="expiresIn">Expires In</option>
              <option value="probability">Probability</option>
            </select>
          </div>

          <div className={styles.sortToggle}>
            <button
              className={styles.toggleButton}
              type="button"
              onClick={() =>
                handleSort(
                  sortConfig.key,
                  sortConfig.order === 'ascending' ? 'descending' : 'ascending'
                )
              }
            >
              <span className={styles.arrowIcon}>
                {sortConfig.order === 'ascending' ? (
                  <>
                    <FaArrowUpLong color="black" />
                    <FaArrowDownLong color="grey" />
                  </>
                ) : (
                  <>
                    <FaArrowUpLong color="grey" />
                    <FaArrowDownLong color="black" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <ModalComponent isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {isMissionSuccess ? (
          <>
            <h4>Congrats you won</h4>
            <Button onClick={() => setModalOpen(false)} title="Continue Playing" />
          </>
        ) : (
          <>
            <h3>You Lose</h3>
            <Button title="close" onClick={() => setModalOpen(false)} />
          </>
        )}
      </ModalComponent>
      <ul className={styles.adsList}>
        {sortedAds?.map((ad: AdData) => (
          <Ad
            key={ad.adId}
            message={ad.message}
            reward={ad.reward}
            expiresIn={ad.expiresIn}
            probability={ad.probability}
            handlePlay={() => handlePlay(ad.adId)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Ads;
