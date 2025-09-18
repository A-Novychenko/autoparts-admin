import { useEffect, useState } from 'react';

import { PageContainer, PageWrap, ProductASGCard } from '@/components/ui';

import { serverApi } from '@/redux/auth/authOperations';

export default function ProductsPage() {
  const [topProducts, setTopProducts] = useState<IProductASG[] | null>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTopProducts = async () => {
      try {
        setIsLoading(true);
        setTopProducts(null);

        const { data } = await serverApi.get('catalog/top-products');

        setTopProducts(data.products);
      } catch (e) {
        console.log('e', e);
      } finally {
        setIsLoading(false);
      }
    };

    getTopProducts();
  }, []);

  return (
    <>
      <h1 className="visually-hidden">ProductsPage</h1>

      {isLoading && null}

      <PageWrap>
        <PageContainer>
          {topProducts &&
            topProducts.map((product: IProductASG) => (
              <li key={product.id}>
                <ProductASGCard product={product} setProducts={() => {}} />
              </li>
            ))}
        </PageContainer>
      </PageWrap>
    </>
  );
}
