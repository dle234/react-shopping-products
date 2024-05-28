import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

import useProductList from '@/hooks/useProductList';

describe('productList', () => {
  it('첫 페이지에서는 20개의 상품 목록을 불러와야 한다.', async () => {
    const { result } = renderHook(() => useProductList());

    await waitFor(() => {
      expect(result.current.productList.length).toBe(20);
      expect(result.current.page).toBe(0);
    });
  });

  it('다음 페이지에서는 4개의 상품 목록을 추가로 불러와야 한다.', async () => {
    const { result } = renderHook(() => useProductList());

    await waitFor(() => {
      expect(result.current.productList.length).toBe(20);
      expect(result.current.page).toBe(0);
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.productList.length).toBe(24);
      expect(result.current.page).toBe(1);
    });
  });
  it('마지막 페이지 일 때 상품 목록을 불러오지 않아야 한다.', async () => {
    const { result } = renderHook(() => useProductList());

    await waitFor(() => {
      expect(result.current.productList.length).toBe(20);
      expect(result.current.page).toBe(0);
    });

    for (let i = 0; i < 10; i++) {
      await waitFor(() => {
        act(() => {
          result.current.fetchNextPage();
        });
      });
    }

    await waitFor(() => {
      expect(result.current.productList.length).toBe(50);
      expect(result.current.page).toBe(8);
    });
  });
});
