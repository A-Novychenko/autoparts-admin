import { useEffect, useState } from 'react';

import {
  CatalogCategoryCard,
  CatalogCategoryList,
  PageContainer,
  PageWrap,
  ProductASGCard,
  SearchForm,
} from '@/components/ui';

import { serverApi } from '@/redux/auth/authOperations';

export default function ProductsPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [products, setProducts] = useState<IProductASG[]>([]);
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const { data } = await serverApi.get('cms-catalog/');
        setCategories(data.categories);
      } catch (e) {
        console.log('e', e);
      }
    };

    getAllCategories();
  }, []);

  const toggleCategory = (id: number) => {
    setOpenCategories(prev =>
      prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]
    );
  };

  const findCategoryById = (
    categories: ICategory[],
    id: number
  ): ICategory | undefined => {
    for (const category of categories) {
      if (category.id === id) {
        return category;
      }

      if (category.childrenCategories) {
        const found = findCategoryById(category.childrenCategories, id);
        if (found) {
          return found;
        }
      }
    }

    return undefined;
  };

  const handleClick = async (id: number) => {
    toggleCategory(id);
    setProducts([]);

    const category: ICategory | undefined = findCategoryById(categories, id);

    if (category) {
      setSelectedCategory(category);
    }

    if (category?.childrenCategories?.length === 0) {
      const { data } = await serverApi.get(
        `cms-catalog/products?id=${category?.id}&page=${1}`
      );
      console.log('data', data);
      setProducts(data.products);
    }
  };

  const keyData = 'products';

  const hasData = products.length > 0;

  const fetchData = async (query: string) => {
    const { data } = await serverApi.post('/catalog/cms-search-products', {
      article: query.trim().toUpperCase(),
    });

    return data;
  };

  return (
    <>
      <h1 className="visually-hidden">ProductsPage</h1>

      <PageWrap>
        <CatalogCategoryList
          handleClick={handleClick}
          categories={categories}
          openCategories={openCategories}
        />

        <PageContainer>
          <CatalogCategoryCard category={selectedCategory} />

          <SearchForm
            setItems={setProducts}
            hasData={hasData}
            fetchData={fetchData}
            keyData={keyData}
          >
            <ul
              style={{
                flexGrow: 1,
                overflow: 'auto',
                height: 'calc(100vh - 353px)',
              }}
            >
              {products.map((product: IProductASG) => (
                <li key={product.id}>
                  <ProductASGCard product={product} />
                </li>
              ))}
            </ul>
          </SearchForm>
        </PageContainer>
      </PageWrap>
    </>
  );
}
