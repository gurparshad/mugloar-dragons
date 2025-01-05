import React, {useState} from "react";
import styles from "./shopItem.module.css";
import Button from "../sharedComponents/button/Button";
import ModalComponent from "../sharedComponents/Modal/Modal";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

interface ShopItemProps {
  id: string;
  name: string;
  cost: number;
  handleClick: () => void;
}

const ShopItem: React.FC<ShopItemProps> = ({name, cost, handleClick}) => {
  const {gold} = useSelector((state: RootState) => state.game);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleShopItemBuy = () => {
    handleClick();
    setModalOpen(false);
  };

  return (
    <div className={styles.shopItem}>
      <h2>{name}</h2>
      <h3>Gold: {cost}</h3>
      <Button onClick={() => setModalOpen(true)} title="Buy" disabled={gold < cost} />
      <ModalComponent isOpen={isModalOpen}>
        <h4>It cost {cost} gold are you sure you want to but it.</h4>
        <Button onClick={handleShopItemBuy} title="Buy now" />
        <Button onClick={() => setModalOpen(false)} title="Cancel" />
      </ModalComponent>
    </div>
  );
};

export default ShopItem;
