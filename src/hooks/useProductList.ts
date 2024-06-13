import { useInfiniteQuery } from '@tanstack/react-query';

import useProductFilter from './useProductFilter';

import { fetchProductList } from '@/api/product';
import { PRODUCT_DATA_SIZE } from '@/constants/productData';
import { ProductResponse } from '@/types/product';

const useProductList = () => {
  const { category, order, handleChangeCategory, handleChangeSort } = useProductFilter();

  const getDataSize = (page: number) =>
    page === 0 ? PRODUCT_DATA_SIZE.FIRST_PAGE : PRODUCT_DATA_SIZE.NEXT_PAGE;

  const { data, isFetching, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<ProductResponse>({
      queryKey: ['fetchProductList', category, order],
      queryFn: ({ pageParam }) =>
        fetchProductList({
          page: pageParam as number,
          category: category.value,
          size: getDataSize(pageParam as number),
          sortOptions: order.value,
        }),
      initialPageParam: 0,
      getNextPageParam: (currentPage, allPages) => {
        const nextPage = allPages.length;
        return currentPage.last ? null : nextPage;
      },
      retry: 3,
      staleTime: 5000 * 60,
    });

  const productList = data?.pages.flatMap((page) => page.content) || [];

  return {
    hasNextPage,
    isFetching,
    isLoading,
    productList,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSort,
    category,
    order,
  };
};

export default useProductList;
