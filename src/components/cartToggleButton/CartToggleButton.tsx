import * as Styled from './CartToggleButton.styled';

import { IMAGES } from '@/assets';
import { AdjustQuantityButton } from '../common/adjustQuantityButton/AdjustQuantityButton';
import { useToast } from '@/hooks/useToast';
import { CartItemInfo } from '@/types/cartItem';

interface CartItemButtonProp {
  productId: number;
  cartItemList?: CartItemInfo[];
  addCartItemMutation: (productId: number) => void;
  matchCartItem: (productId: number) => CartItemInfo | undefined;
}

const CartToggleButton = ({
  productId,
  cartItemList,
  addCartItemMutation,
  matchCartItem,
}: CartItemButtonProp) => {
  const { toastError } = useToast();

  return (
    <>
      {matchCartItem(productId) ? (
        <Styled.HandleCartItemButton $isInCart={true}>
          <AdjustQuantityButton productId={productId} />
        </Styled.HandleCartItemButton>
      ) : (
        <Styled.HandleCartItemButton
          $isInCart={false}
          onClick={() => {
            if (!cartItemList) return;
            if (cartItemList.length >= 20) {
              toastError('장바구니에 더 이상 추가할 수 없습니다.');
              return;
            }
            addCartItemMutation(productId);
          }}
        >
          <img src={IMAGES.ADD_SHOPPING_CART} alt="장바구니에 담기버튼" />
          담기
        </Styled.HandleCartItemButton>
      )}
    </>
  );
};

export default CartToggleButton;
