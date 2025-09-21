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
  orderIsAccounted: boolean;
  setProducts: Dispatch<SetStateAction<OrderProduct[]>>;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
}> = ({ products, orderIsAccounted, orderId, setProducts, setOrder }) => {
  return (
    <ProductSection isAccounted={orderIsAccounted}>
      <ProductWrap>
        <ProductsHeader isAccounted={orderIsAccounted}>
          {productsHeaderItems.map((el, idx) => (
            <ProductsHeaderItem isAccounted={orderIsAccounted} key={idx + el}>
              {el}
            </ProductsHeaderItem>
          ))}
        </ProductsHeader>

        <ProductList isAccounted={orderIsAccounted}>
          {products.map((product: OrderProduct, idx: number) => (
            <OrderProductsCard
              key={product._id}
              product={product}
              idx={idx}
              orderId={orderId}
              orderIsAccounted={orderIsAccounted}
              setProducts={setProducts}
              setOrder={setOrder}
            />
          ))}
        </ProductList>

        <OrderAddProduct
          products={products}
          setProducts={setProducts}
          orderId={orderId}
          orderIsAccounted={orderIsAccounted}
          setOrder={setOrder}
        />
      </ProductWrap>
    </ProductSection>
  );
};
