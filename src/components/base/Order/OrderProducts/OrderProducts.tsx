import { Dispatch, SetStateAction } from 'react';

import { OrderAddProduct, OrderProductsCard } from '@components/base';

import {
  ProductList,
  ProductSection,
  ProductsHeader,
  ProductsHeaderItem,
  ProductWrap,
} from './OrderProducts.styled';

import { productsHeaderItems } from '../orderListParams';

export const OrderProducts: React.FC<{
  products: OrderProduct[];
  orderId: string;
  setProducts: Dispatch<SetStateAction<OrderProduct[] | null>>;
}> = ({ products, orderId, setProducts }) => {
  return (
    <ProductSection>
      <ProductWrap>
        <ProductsHeader>
          {productsHeaderItems.map((el, idx) => (
            <ProductsHeaderItem key={idx + el}>{el}</ProductsHeaderItem>
          ))}
        </ProductsHeader>

        <ProductList>
          {products.map((product: OrderProduct, idx: number) => (
            <OrderProductsCard
              key={product._id}
              product={product}
              idx={idx}
              orderId={orderId}
              setProducts={setProducts}
            />
          ))}
        </ProductList>

        <OrderAddProduct
          products={products}
          setProducts={setProducts}
          orderId={orderId}
        />
      </ProductWrap>
    </ProductSection>
  );
};
