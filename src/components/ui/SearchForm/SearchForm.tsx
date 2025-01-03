import { useState } from 'react';

import staticData from '@/data/common.json';

import { searchFormProps } from './types';

import { Form, FormField, SearchButton } from './SearchForm.styled';

export const SearchForm: React.FC<searchFormProps> = ({
  keyData,
  setItems,
  fetchData,
  setSelectedCategory,
  loadingSearchProducts,
  setLoadingSearchProducts,
  setErrorSearchProducts,
}) => {
  const {
    loadingText,
    searchText,
    searchNotFound,
    searchErrorText,
    searchPlaceholder,
  } = staticData.staticText.searchForm;

  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setItems([]);
    setLoadingSearchProducts(true);
    setErrorSearchProducts(null);
    try {
      const data = await fetchData(query);

      setSelectedCategory(null);
      setItems(data[keyData]);
      setQuery('');

      if (data[keyData].length < 1) {
        setErrorSearchProducts(searchNotFound);
      }
    } catch (error) {
      setErrorSearchProducts(searchErrorText);
    } finally {
      setLoadingSearchProducts(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormField
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={searchPlaceholder}
        />

        <SearchButton type="submit" disabled={loadingSearchProducts}>
          {loadingSearchProducts ? loadingText : searchText}
        </SearchButton>
      </Form>
    </>
  );
};
