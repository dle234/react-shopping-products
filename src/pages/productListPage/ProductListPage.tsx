import { useRef } from 'react';

import * as Styled from './ProductListPage.styled';

import Dropdown from '@/components/common/dropdown/Dropdown';
import Header from '@/components/common/header/Header';
import InfinityScrollContainer from '@/components/common/InfinityScrollContainer';
import ProductCardList from '@/components/productCardList/ProductCardList';
import Title from '@/components/title/Title';
import { CATEGORY, SORT_OPTIONS } from '@/constants/dropdownOption';

import useProductList from '@/hooks/useProductList';
import { useModalHandler } from 'hash-modal';
import CartModalInfo from '@/components/cartInfoModal/CartInfoModal';
import useCartItemList from '@/hooks/useCartItemList';

const ProductListPage = () => {
  const {
    productList,
    isLoading,
    isFetching,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSort,
    order,
    category,
    hasNextPage,
  } = useProductList();
  const { cartItemList, addCartItemMutation, matchCartItem } = useCartItemList();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { modalOpen, openModal, closeModal } = useModalHandler();

  return (
    <InfinityScrollContainer
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      bottomRef={bottomRef}
    >
      <Styled.PageContainer>
        <Header cartCount={cartItemList?.length} openModal={openModal} />
        <Styled.CommonContainer>
          {modalOpen && <CartModalInfo closeModal={closeModal} />}
          <Title title="상품 목록" />
          <Styled.DropdownContainer>
            <Dropdown
              value={category.label}
              options={CATEGORY}
              handleSelect={handleChangeCategory}
            />
            <Dropdown value={order.label} options={SORT_OPTIONS} handleSelect={handleChangeSort} />
          </Styled.DropdownContainer>

          <ProductCardList
            isFetching={isFetching}
            productList={productList}
            isLoading={isLoading}
            cartItemList={cartItemList}
            addCartItemMutation={addCartItemMutation}
            matchCartItem={matchCartItem}
          />

          <div ref={bottomRef} style={{ height: 100 }}></div>
        </Styled.CommonContainer>
      </Styled.PageContainer>
    </InfinityScrollContainer>
  );
};

export default ProductListPage;
