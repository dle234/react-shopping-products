import * as Styled from './ProductCardList.styled';
import CartToggleButton from '../cartToggleButton/CartToggleButton';
import Spinner from '../common/spinner/Spinner';
import ProductCard from '../productCard/ProductCard';

import { Product } from '@/types/product';
import { CartItemInfo } from '@/types/cartItem';

interface ProductCardListProp {
  productList: Product[];
  isLoading: boolean;
  isFetching: boolean;
  cartItemList?: CartItemInfo[];
  addCartItemMutation: (productId: number) => void;
  matchCartItem: (productId: number) => CartItemInfo | undefined;
}

const ProductCardList = ({
  isFetching,
  productList,
  isLoading,
  cartItemList,
  addCartItemMutation,
  matchCartItem,
}: ProductCardListProp) => {
  return (
    <>
      <Styled.ProductCardListWrapper>
        {productList.map((product, idx) => (
          <div key={`${product.id}_${idx}`}>
            <ProductCard imageUrl={product.imageUrl} name={product.name} price={product.price}>
              <CartToggleButton
                productId={product.id}
                cartItemList={cartItemList}
                addCartItemMutation={addCartItemMutation}
                matchCartItem={matchCartItem}
              />
            </ProductCard>
          </div>
        ))}
      </Styled.ProductCardListWrapper>

      {(isFetching || isLoading) && <Spinner />}
    </>
  );
};

export default ProductCardList;
