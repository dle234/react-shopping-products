import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import cartItemList from '../mocks/cartItems.json';
import cartItemListReset from '../mocks/cartItemsReset.json';

import { ToastProvider } from '@/components/common/toast/Toast';
import theme from '@/theme';

import useCartItemList from '@/hooks/useCartItemList';

describe('cartItemList', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
  beforeEach(() => {
    queryClient.clear();
  });
  afterEach(() => {
    queryClient.clear();
    cartItemList.content = cartItemListReset.content;
  });
  const testProductId = 169;
  const prevCartItemListLength = 10;

  describe('장바구니에 상품 추가 테스트', async () => {
    it(`상품을 장바구니에 담으면 장바구니 전체 수량이 1 증가한다.`, async () => {
      const { result } = renderHook(() => useCartItemList(), { wrapper });
      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(prevCartItemListLength);
      });

      await waitFor(async () => {
        act(() => {
          result.current.addCartItemMutation(testProductId);
        });
      });

      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(prevCartItemListLength + 1);
      });
    });
    it(`상품을 장바구니에 담으면 해당 상품이 장바구니에 추가된다.`, async () => {
      const { result } = renderHook(() => useCartItemList(), { wrapper });

      await waitFor(async () => {
        act(() => {
          result.current.addCartItemMutation(testProductId);
        });
      });

      await waitFor(() => {
        expect(result.current.matchCartItem(testProductId)).toBeTruthy;
      });
    });
  });
  describe('장바구니 수량 삭제 테스트', () => {
    it(`상품을 장바구니서 삭제하면 장바구니 전체 수량이 1 감소한다.`, async () => {
      const deleteCartItemId = 15527;

      const { result } = renderHook(() => useCartItemList(), { wrapper });
      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(prevCartItemListLength);
      });

      await waitFor(async () => {
        act(() => {
          result.current.deleteCartItemMutation(deleteCartItemId);
        });
      });
      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(prevCartItemListLength - 1);
      });
    });
  });

  describe('장바구니 상품 수량 조절 테스트', () => {
    it(`장바구니에 담긴 상품의 수량을 10으로 변경할 수 있다.`, async () => {
      const adjustCartItemId = 10938;

      const { result } = renderHook(() => useCartItemList(), { wrapper });
      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(prevCartItemListLength);
      });

      await waitFor(async () => {
        act(() => {
          result.current.adjustCartItemQuantityMutation({
            cartItemId: adjustCartItemId,
            quantity: 10,
          });
        });
      });

      await waitFor(() => {
        const quantity = result.current.getCartItemQuantity(testProductId);
        expect(quantity).toBe(10);
      });
    });
  });
});
