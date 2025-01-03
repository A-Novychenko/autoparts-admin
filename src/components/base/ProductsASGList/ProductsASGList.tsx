import { Loader, Pagination, ProductASGCard } from '@/components/ui';

import staticData from '@/data/common.json';

import { ProductsASGListProps } from './types';

import {
  Wrap,
  List,
  ErrorText,
  LoaderWrap,
  PaginationWrap,
  EmptyList,
} from './ProductsASGList.styled';

export const ProductsASGList: React.FC<ProductsASGListProps> = ({
  products,
  setProducts,
  hasData,
  loadingSearchProducts,
  errorSearchProducts,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const { noResultsText } = staticData.staticText.searchForm;

  return (
    <Wrap>
      {hasData ? (
        <List>
          {products.map((product: IProductASG) => (
            <li key={product.id}>
              <ProductASGCard product={product} setProducts={setProducts} />
            </li>
          ))}
        </List>
      ) : (
        !loadingSearchProducts && (
          <EmptyList>
            {errorSearchProducts ? (
              <ErrorText>{errorSearchProducts}</ErrorText>
            ) : (
              <ErrorText>{noResultsText}</ErrorText>
            )}
          </EmptyList>
        )
      )}

      {loadingSearchProducts && (
        <LoaderWrap>
          <Loader />
        </LoaderWrap>
      )}

      <PaginationWrap>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setProducts={setProducts}
        />
      </PaginationWrap>
    </Wrap>
  );
};
