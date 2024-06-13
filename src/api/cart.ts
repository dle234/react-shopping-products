import { ERROR_MESSAGE } from '@/constants/message';
import { AUTH_HEADER } from './auth';
import { END_POINT } from './endpoints';
import fetcher from './fetcher';

import { CartItemInfo } from '@/types/cartItem';

interface AddCartItemProp {
  productId: number;
  quantity?: number;
}

type StatusResponse = Record<'status', number>;

export const fetchCartItems = async (): Promise<CartItemInfo[]> => {
  const response = await fetcher.get({
    url: `${END_POINT.cartItems}`,
    headers: AUTH_HEADER,
    errorMessage: ERROR_MESSAGE.CART_ITEM.GET,
  });

  const data = await response.json();

  return data.content;
};

export const addCartItem = async ({
  productId,
  quantity = 1,
}: AddCartItemProp): Promise<StatusResponse> => {
  const response = await fetcher.post({
    url: END_POINT.cartItems,
    headers: AUTH_HEADER,
    body: {
      productId,
      quantity,
    },
    errorMessage: ERROR_MESSAGE.CART_ITEM.ADD,
  });

  return { status: response.status };
};

export const deleteCartItem = async (cartId: number): Promise<StatusResponse> => {
  const response = await fetcher.delete({
    url: `${END_POINT.cartItems}/${cartId}`,
    headers: AUTH_HEADER,
    errorMessage: ERROR_MESSAGE.CART_ITEM.DELETE,
  });

  return { status: response.status };
};

export const adjustCartItemQuantity = async (
  cartItemId: number,
  quantity: number,
): Promise<StatusResponse> => {
  const response = await fetcher.patch({
    url: `${END_POINT.cartItems}/${cartItemId}`,
    headers: AUTH_HEADER,
    errorMessage: ERROR_MESSAGE.CART_ITEM.ADJUST,
    body: { quantity },
  });

  return { status: response.status };
};
