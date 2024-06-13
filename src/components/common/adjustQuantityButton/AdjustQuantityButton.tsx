import useCartItemList from '@/hooks/useCartItemList';
import * as Styled from './AdjustQuantityButton.styled';
import { IMAGES } from '@/assets';

interface AdjustQuantityButtonProp {
  productId: number;
}

export const AdjustQuantityButton = ({ productId }: AdjustQuantityButtonProp) => {
  const { adjustCartItemQuantityMutation, matchCartItem } = useCartItemList();

  const cartItemQuantity = matchCartItem(productId)?.quantity || 0;
  const cartItemId = matchCartItem(productId)?.id;

  const handleAdjustQuantity = (quantity: number) => {
    if (!cartItemId) return;
    adjustCartItemQuantityMutation({
      cartItemId: cartItemId,
      quantity: quantity,
    });
  };

  return (
    <>
      <Styled.Button
        onClick={() => {
          handleAdjustQuantity(cartItemQuantity - 1);
        }}
      >
        <img src={IMAGES.MINUS_BUTTON} alt="-"></img>
      </Styled.Button>
      {cartItemQuantity}
      <Styled.Button
        onClick={() => {
          handleAdjustQuantity(cartItemQuantity + 1);
        }}
      >
        <img src={IMAGES.PLUS_BUTTON} alt="+"></img>
      </Styled.Button>
    </>
  );
};
