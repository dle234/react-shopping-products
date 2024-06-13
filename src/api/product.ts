import { ERROR_MESSAGE } from '@/constants/message';
import { END_POINT } from './endpoints';
import fetcher from './fetcher';

import { ProductCategory, ProductResponse, SortValue } from '@/types/product';
import { createUrlQuery } from '@/utils/createUrlQuery';

interface FetchProductListProps {
  size?: number;
  category: ProductCategory;
  page?: number;
  sortOptions?: SortValue;
}

const convertUrlFormat = ({ category, page, size, sortOptions }: FetchProductListProps) => {
  const params = createUrlQuery({ category, page, size, sortOptions });
  return `${END_POINT.products}?${params.toString()}`;
};

export const fetchProductList = async ({
  category,
  size,
  page = 0,
  sortOptions,
}: FetchProductListProps): Promise<ProductResponse> => {
  const response = await fetcher.get({
    url: convertUrlFormat({ category, page, size, sortOptions }),
    errorMessage: ERROR_MESSAGE.PRODUCT_ITEM.GET,
  });

  const data = await response.json();

  return data;
};
