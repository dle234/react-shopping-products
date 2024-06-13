import { http, HttpResponse } from 'msw';

import cartItemList from './cartItems.json';
import productList from './products.json';

import { END_POINT } from '@/api/endpoints';
import { PRODUCT_DATA_SIZE } from '@/constants/productData';

interface CartItemParams {
  productId: number;
  quantity: number;
}

export const handlers = [
  http.get(END_POINT.products, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page')) || 0;
    const limit = Number(url.searchParams.get('size'));
    const start =
      page === 0 ? 0 : (page - 5) * PRODUCT_DATA_SIZE.NEXT_PAGE + PRODUCT_DATA_SIZE.FIRST_PAGE;
    const end = start + limit;
    const content = productList.content.slice(start, end);

    const result = {
      ...productList,
      content,
    };
    if (page === 5) {
      result.last = true;
    }

    return HttpResponse.json(result);
  }),

  http.get(END_POINT.cartItems, () => {
    return HttpResponse.json(cartItemList, { status: 200 });
  }),

  http.post(END_POINT.cartItems, async ({ request }) => {
    const response = (await request.json()) as CartItemParams;
    const { productId, quantity } = response;

    const newCartItem = {
      id: Date.now(),
      quantity,
      product: {
        id: productId,
        name: '테스트 아이템',
        price: 999,
        imageUrl: 'mockImg',
        category: 'fashion',
      },
    };

    if (cartItemList) cartItemList.content.push(newCartItem);

    return HttpResponse.json(null, { status: 201 });
  }),

  http.post(END_POINT.cartItems, async ({ request }) => {
    const response = (await request.json()) as CartItemParams;
    const { productId, quantity } = response;

    const newCartItem = {
      id: Date.now(),
      quantity,
      product: {
        id: productId,
        name: '테스트 아이템',
        price: 999,
        imageUrl: 'mockImg',
        category: 'fashion',
      },
    };

    if (cartItemList) cartItemList.content.push(newCartItem);

    return HttpResponse.json(null, { status: 201 });
  }),

  http.delete(END_POINT.cartItems + '/:id', async ({ params }) => {
    const cartItemId = Number(params.id);

    const getCartItem = cartItemList.content.filter((cartItem) => cartItem.id !== cartItemId);
    if (getCartItem) cartItemList.content = getCartItem;

    return HttpResponse.json(null, { status: 200 });
  }),

  http.patch(END_POINT.cartItems + '/:id', async ({ request, params }) => {
    const response = (await request.json()) as { quantity: number };
    const cartItemId = Number(params.id);
    const { quantity } = response;
    const getCartItem = cartItemList.content.find((cartItem) => cartItem.id === cartItemId);
    if (getCartItem) getCartItem.quantity = quantity;

    return HttpResponse.json(null, { status: 200 });
  }),
];
