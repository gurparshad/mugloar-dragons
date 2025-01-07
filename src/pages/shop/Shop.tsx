import React, {useState} from "react";
import {useFetchShopItemsQuery, usePurchaseItemMutation} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import ShopItem from "../../components/shopItem/ShopItem";
import {updateStats} from "../../features/gameSlice";
import ModalComponent from "../../components/sharedComponents/Modal/Modal";
import Button from "../../components/sharedComponents/button/Button";
import styles from "./shop.module.scss";

const Shop = () => {
  const {gameId, gold, level} = useSelector((state: RootState) => state.game);
  const [purchaseItem] = usePurchaseItemMutation();
  const {data, isLoading, isError} = useFetchShopItemsQuery(gameId || "");
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isPurchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

  if (isLoading) return <div>Loading shop items...</div>;
  if (isError) return <div>Failed to load shop items. Please try again later.</div>;

  const handleItemPurchase = async (itemId: string) => {
    if (!gameId) {
      alert("Game ID is missing.");
      return;
    }
    try {
      const response = await purchaseItem({gameId, itemId}).unwrap();
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
      console.error("Error purchasing item:", error);
      alert("An error occurred during the purchase. Please try again.");
    }
  };

  return (
    <div>
      <h2>Shop</h2>
      {data?.length ? (
        <ul className={styles.shopItemList}>
          {data?.map((item) => (
            <ShopItem id={item.id} name={item.name} cost={item.cost} handleClick={() => handleItemPurchase(item.id)} />
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
