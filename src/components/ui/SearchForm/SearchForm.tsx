import { useState } from 'react';

import staticData from '@/data/common.json';

import { searchFormProps } from './types';

import { ErrorText, Form, FormField, SearchButton } from './SearchForm.styled';

export const SearchForm: React.FC<searchFormProps> = ({
  children,
  keyData,
  setItems,
  hasData,
  fetchData,
}) => {
  const { loadingText, searchText, searchPlaceholder, noResultsText } =
    staticData.staticText.searchForm;

  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(query);

      setItems(data[keyData]);
    } catch (error) {
      setError('Не вдалося знайти товари. Спробуйте ще раз.');
    } finally {
      setLoading(false);
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

        <SearchButton type="submit" disabled={loading}>
          {loading ? loadingText : searchText}
        </SearchButton>
      </Form>

      {error && <ErrorText>{error}</ErrorText>}

      <div>
        {hasData ? <>{children}</> : !loading && <p>{noResultsText}</p>}
      </div>
    </>
  );
};
