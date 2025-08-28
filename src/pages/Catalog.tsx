import { useEffect, useState } from 'react';

import {
  CatalogCategoryCard,
  CatalogCategoryList,
  PageContainer,
  PageWrap,
  SearchForm,
} from '@/components/ui';
import { ProductsASGList } from '@/components/base';

import { serverApi } from '@/redux/auth/authOperations';

export default function CatalogPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const [products, setProducts] = useState<IProductASG[]>([]);
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingSearchProducts, setLoadingSearchProducts] =
    useState<boolean>(false);

  const [errorSearchProducts, setErrorSearchProducts] = useState<string | null>(
    null
  );

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        setIsLoading(true);
        setSelectedCategory(null);

        const { data } = await serverApi.get('cms-catalog/');

        setCategories(data.categories);
        setSelectedCategory(data.categories[0]);
      } catch (e) {
        console.log('e', e);
      } finally {
        setIsLoading(false);
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
    setCurrentPage(1);
    setTotalPages(1);

    const category: ICategory | undefined = findCategoryById(categories, id);

    if (category) {
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingSearchProducts(true);

        const { data } = await serverApi.get(
          `cms-catalog/products?id=${selectedCategory?.id}&page=${currentPage}`
        );

        if (currentPage === 1) {
          setTotalPages(data.totalPages);
        }

        setProducts(data.products);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoadingSearchProducts(false);
      }
    };

    if (selectedCategory?.childrenCategories?.length === 0) {
      fetchData();
    }
  }, [selectedCategory, currentPage]);

  const keyData = 'products';

  const hasData = products.length > 0;

  const fetchData = async (query: string) => {
    const { data } = await serverApi.post('/cms-catalog/search-products', {
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
          isLoading={isLoading}
          selectedCategory={selectedCategory}
        />

        <PageContainer>
          <CatalogCategoryCard
            category={selectedCategory}
            isLoading={isLoading}
            setCategories={setCategories}
          />

          <SearchForm
            setItems={setProducts}
            fetchData={fetchData}
            keyData={keyData}
            setSelectedCategory={setSelectedCategory}
            loadingSearchProducts={loadingSearchProducts}
            setLoadingSearchProducts={setLoadingSearchProducts}
            setErrorSearchProducts={setErrorSearchProducts}
          />

          <ProductsASGList
            products={products}
            setProducts={setProducts}
            hasData={hasData}
            loadingSearchProducts={loadingSearchProducts}
            errorSearchProducts={errorSearchProducts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </PageContainer>
      </PageWrap>
    </>
  );
}
