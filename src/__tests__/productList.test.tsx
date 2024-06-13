import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { PRODUCT_DATA_SIZE } from '@/constants/productData';

import useProductList from '@/hooks/useProductList';

describe('productList', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  afterEach(() => {
    queryClient.clear();
  });
  describe('pagination 테스트', () => {
    it(`첫 페이지에서는 ${PRODUCT_DATA_SIZE.FIRST_PAGE}개의 상품 목록을 불러와야 한다.`, async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(PRODUCT_DATA_SIZE.FIRST_PAGE);
      });
    });

    it(`다음 페이지에서는 ${PRODUCT_DATA_SIZE.NEXT_PAGE}개의 상품 목록을 추가로 불러와야 한다.`, async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(PRODUCT_DATA_SIZE.FIRST_PAGE);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(
          PRODUCT_DATA_SIZE.FIRST_PAGE + PRODUCT_DATA_SIZE.NEXT_PAGE,
        );
      });
    });
    it('마지막 페이지 일 때 상품 목록을 불러오지 않아야 한다.', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      await waitFor(() => {
        expect(result.current.productList.length).toBe(PRODUCT_DATA_SIZE.FIRST_PAGE);
      });

      for (let page = 2; page < 5; page += 1) {
        act(() => {
          result.current.fetchNextPage();
        });

        const expectedProductsCount =
          PRODUCT_DATA_SIZE.FIRST_PAGE + (page - 1) * PRODUCT_DATA_SIZE.NEXT_PAGE;

        await waitFor(() => {
          expect(result.current.productList).toHaveLength(expectedProductsCount);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList.length).toBe(36);
      });
    });
  });

  describe('상품 목록 불러오기 테스트', () => {
    it('초기 화면에서 상품 목록 데이터를 불러온다', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      await waitFor(() => {
        expect(result.current.productList.length > 0).toBeTruthy();
      });
    });
    it('상품 목록 데이터를 불러오기 전 로딩 화면이 표시된다.', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      expect(result.current.isLoading).toBeTruthy();

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
      });
    });
  });
});
