import { useState } from 'react';

import { ProductASGCard } from '../ProductASGCard';

import { serverApi } from '@/redux/auth/authOperations';

export const SearchForm: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductASG[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log('query', query);
  console.log('products', products);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const { data } = await serverApi.post('/catalog/cms-search-products', {
        article: query.trim().toUpperCase(),
      });

      setProducts(data.products);
    } catch (error) {
      setError('Не вдалося знайти товари. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Пошук товарів..."
          style={{ padding: '8px', width: '100%' }}
        />
        <button type="submit" style={{ padding: '8px' }} disabled={loading}>
          {loading ? 'Завантаження...' : 'Пошук'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product: IProductASG) => (
              <li key={product.id}>
                <ProductASGCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>Немає результатів для пошуку.</p>
        )}
      </div>
    </div>
  );
};
