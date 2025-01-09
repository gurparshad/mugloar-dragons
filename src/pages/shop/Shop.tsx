import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './shop.module.scss';
import { RootState } from '../../app/store';
import Button from '../../components/sharedComponents/button/Button';
import LoadingSpinner from '../../components/sharedComponents/loadingSpinner/LoadingSpinner';
import ModalComponent from '../../components/sharedComponents/Modal/Modal';
import ShopItem from '../../components/shopItem/ShopItem';
import { useFetchShopItemsQuery, usePurchaseItemMutation } from '../../features/apiSlice';
import { setError } from '../../features/errorSlice';
import { updateStats } from '../../features/gameSlice';
import { logError } from '../../utils/logger';

const Shop = () => {
  const { gameId, gold, level } = useSelector((state: RootState) => state.game);
  const [purchaseItem] = usePurchaseItemMutation();
  const { data, isLoading, isError } = useFetchShopItemsQuery(gameId || '');
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isPurchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Failed to load shop items. Please try again later.</div>;

  const handleItemPurchase = async (itemId: string) => {
    if (!gameId) {
      const errorMessage = 'Game ID is required to purchase an item.';
      const errorDetails = new Error(errorMessage);
      logError(errorMessage, errorDetails, 'Shop - handleItemPurchase');
      dispatch(setError('Game ID is required to purchase an item.'));
      return;
    }
    try {
      const response = await purchaseItem({ gameId, itemId }).unwrap();
      if (response.shoppingSuccess) {
        dispatch(
          updateStats({
            gold: response.gold,
            level: response.level,
          })
        );
        setModalOpen(true);
        setPurchaseSuccess(true);
      } else {
        setModalOpen(true);
        setPurchaseSuccess(false);
      }
    } catch (error) {
      const errorMessage = 'Error purchasing item';
      logError(errorMessage, error, 'Shop - handleItemPurchase, purchaseItem');
      dispatch(setError('An error occurred during the purchase. Please try again.'));
    }
  };

  return (
    <div>
      <h2>Shop</h2>
      {data?.length ? (
        <ul className={styles.shopItemList}>
          {data?.map((item) => (
            <ShopItem
              key={item.id}
              id={item.id}
              name={item.name}
              cost={item.cost}
              handleClick={() => handleItemPurchase(item.id)}
            />
          ))}
        </ul>
      ) : (
        <div>No items available in the shop.</div>
      )}
      <ModalComponent isOpen={isModalOpen}>
        {isPurchaseSuccess ? (
          <div>
            Purchase successful! Gold Left: {gold}, Level: {level}
          </div>
        ) : (
          <div>Purchase failed. Please try again.</div>
        )}
        <Button onClick={() => setModalOpen(false)} title="Close" />
      </ModalComponent>
    </div>
  );
};

export default Shop;
