import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getGameLevelCode} from "../../utils/helpers";
import Button from "../sharedComponents/button/Button";
import styles from "./ad.module.css";
import ModalComponent from "../sharedComponents/Modal/Modal";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

interface AdProps {
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
  handlePlay: () => {};
}

const Ad: React.FC<AdProps> = ({message, reward, expiresIn, probability, handlePlay}) => {
  const game = useSelector((state: RootState) => state.game);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [levelCode, setLevelCode] = useState<number>(0);

  const handleAdClick = (probability: string) => {
    setModalOpen(true);
    //@ts-ignore
    setLevelCode(getGameLevelCode(probability));
  };

  const handleClickPlay = () => {
    setModalOpen(false);
    handlePlay();
  };

  return (
    <div
      className={styles.ad}
      // @ts-ignore
      style={{background: game.level < getGameLevelCode(probability) ? "darkred" : "forestgreen"}}
    >
      <h2>{message}</h2>
      <h2>Reward: {reward}</h2>
      <h2>Difficulty: {probability}</h2>
      <h2>ExpiresIn: {expiresIn}</h2>
      <Button onClick={() => handleAdClick(probability)} title="Play now" />
    </div>
  );
};

export default Ad;
