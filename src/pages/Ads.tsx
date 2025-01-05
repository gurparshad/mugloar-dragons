import React, {useState} from "react";
import {useFetchAdsQuery, useSolveAdMutation} from "../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import Ad from "../components/ad/Ad";
import ModalComponent from "../components/sharedComponents/Modal/Modal";
import Button from "../components/sharedComponents/button/Button";
import {updateStats} from "../features/gameSlice";

interface AdData {
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
}

const AdList: React.FC = () => {
  const gameId = useSelector((state: RootState) => state.game.gameId);
  const {data, isLoading, error} = useFetchAdsQuery(gameId || "");
  const [solveAd] = useSolveAdMutation();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isMissionSuccess, setMissionSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handlePlay = async (adId: string) => {
    if (!gameId) {
      console.error("Game ID is required to solve an ad.");
      return;
    }
    try {
      const response = await solveAd({gameId, adId}).unwrap();
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
    } catch (err) {
      console.error("Failed to solve the ad:", err);
    }
  };

  if (isLoading) return <p>Loading ads...</p>;
  if (error) return <p>Error loading ads.</p>;

  return (
    <div>
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
      <ul>
        {data?.map((ad: AdData) => (
          <Ad
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

export default AdList;
