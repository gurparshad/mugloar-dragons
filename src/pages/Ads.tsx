import React from "react";
import {useFetchAdsQuery, useSolveAdMutation} from "../features/apiSlice";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import Ad from "../components/ad/Ad";

interface Ad {
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

  const handlePlay = async (adId: string) => {
    if (!gameId) {
      console.error("Game ID is required to solve an ad.");
      return;
    }
    try {
      const response = await solveAd({gameId, adId}).unwrap();
      console.log("Ad solved successfully:", response);
    } catch (err) {
      console.error("Failed to solve the ad:", err);
    }
  };

  if (isLoading) return <p>Loading ads...</p>;
  if (error) return <p>Error loading ads.</p>;

  return (
    <ul>
      {data?.map((ad: Ad) => (
        <Ad
          message={ad.message}
          reward={ad.reward}
          expiresIn={ad.expiresIn}
          probability={ad.probability}
          handlePlay={() => handlePlay(ad.adId)}
        />
      ))}
    </ul>
  );
};

export default AdList;
