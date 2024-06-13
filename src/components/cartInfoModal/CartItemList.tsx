import useCartItemList from '@/hooks/useCartItemList';
import CartItem from './CartItem';
import * as Styled from './CartItemList.styled';
import { koMoneyFormat } from '@/utils/koMoneyFormat';

const CartItemList = () => {
  const { cartItemList, deleteCartItemMutation, totalCartItemPrice } = useCartItemList();
  return (
    <Styled.CartItemListContainer>
      {cartItemList?.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.product.id}
            cartId={cartItem.id}
            productId={cartItem.product.id}
            img={cartItem.product.imageUrl}
            productName={cartItem.product.name}
            productPrice={cartItem.product.price}
            deleteCartItem={deleteCartItemMutation}
          />
        );
      })}

      <Styled.Divider />

      <Styled.TotalPriceBox>
        <Styled.TotalPriceLabel>총 결제 금액</Styled.TotalPriceLabel>
        <Styled.TotalPrice>
          {totalCartItemPrice && koMoneyFormat(totalCartItemPrice)}
        </Styled.TotalPrice>
      </Styled.TotalPriceBox>
    </Styled.CartItemListContainer>
  );
};

export default CartItemList;
