import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './ads.module.scss';
import { RootState } from '../../app/store';
import Ad from '../../components/ad/Ad';
import Button from '../../components/sharedComponents/button/Button';
import ModalComponent from '../../components/sharedComponents/Modal/Modal';
import { useFetchAdsQuery, useSolveAdMutation } from '../../features/apiSlice';
import { updateStats, resetGame } from '../../features/gameSlice';
import { ApplicationRoutes, Levels } from '../../utils/constants';

interface AdData {
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
}

const Ads: React.FC = () => {
  const gameId = useSelector((state: RootState) => state.game.gameId);
  const { data, isLoading, error, refetch } = useFetchAdsQuery(gameId || '');
  const [solveAd] = useSolveAdMutation();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isMissionSuccess, setMissionSuccess] = useState<boolean>(false);
  const [sortedAds, setSortedAds] = useState<AdData[] | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; order: string }>({
    key: 'reward',
    order: 'ascending',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlay = async (adId: string) => {
    if (!gameId) {
      console.error('Game ID is required to solve an ad.');
      return;
    }
    try {
      const response = await solveAd({ gameId, adId }).unwrap();
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
        setMissionSuccess(false);
        setModalOpen(true);
      }
      refetch();
    } catch (err) {
      console.error('Failed to solve the ad:', err);
    }
  };

  const handleGameQuit = () => {
    dispatch(resetGame());
    navigate(ApplicationRoutes.HOME);
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

  if (isLoading) return <p>Loading ads...</p>;
  if (error) return <p>Error loading ads.</p>;

  return (
    <div>
      <div className={styles.sortContainer}>
        <div className={styles.sortKey}>
          <label htmlFor="sortKey">Sort By:</label>
          <select
            id="sortKey"
            value={sortConfig.key}
            onChange={(e) => handleSort(e.target.value, sortConfig.order)}
          >
            <option value="reward">Reward</option>
            <option value="expiresIn">Expires In</option>
            <option value="probability">Probability</option>
          </select>
        </div>

        <div className={styles.sortToggle}>
          <button
            type="button"
            onClick={() =>
              handleSort(
                sortConfig.key,
                sortConfig.order === 'ascending' ? 'descending' : 'ascending'
              )
            }
          >
            <span className={styles.arrowIcon}>
              {sortConfig.order === 'ascending' ? '⬆️⬇️' : '⬇️⬆️'}
            </span>
          </button>
        </div>
      </div>

      <div>
        <Button onClick={() => navigate(ApplicationRoutes.SHOP)} title="Shop" />
        <Button onClick={handleGameQuit} title="Quit" />
      </div>
      <ModalComponent isOpen={isModalOpen}>
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
