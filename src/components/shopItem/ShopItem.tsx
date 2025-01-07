import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './shopItem.module.scss';
import { RootState } from '../../app/store';
import Button from '../sharedComponents/button/Button';
import ModalComponent from '../sharedComponents/Modal/Modal';

interface ShopItemProps {
  id: string;
  name: string;
  cost: number;
  handleClick: (id: string) => void;
}

const ShopItem: React.FC<ShopItemProps> = ({ id, name, cost, handleClick }) => {
  const { gold } = useSelector((state: RootState) => state.game);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleShopItemBuy = () => {
    handleClick(id);
    setModalOpen(false);
  };

  const isAffordable = gold >= cost;

  return (
    <div className={`${styles.shopItem} ${isAffordable ? styles.affordable : styles.unaffordable}`}>
      <div className={styles.itemContent}>
        <h2 className={styles.itemName}>{name}</h2>
        <h3 className={styles.itemCost}>Cost: {cost} Gold</h3>
      </div>
      <Button
        onClick={() => setModalOpen(true)}
        title="Buy"
        disabled={!isAffordable}
        className={styles.buyButton}
      />
      <ModalComponent isOpen={isModalOpen}>
        <div className={styles.modalContent}>
          <h4 className={styles.modalMessage}>Confirm Purchase</h4>
          <p>
            This item costs <span>{cost} gold</span>. Are you sure you want to buy it?
          </p>
          <div className={styles.modalActions}>
            <Button onClick={handleShopItemBuy} title="Buy Now" />
            <Button onClick={() => setModalOpen(false)} title="Cancel" />
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ShopItem;
