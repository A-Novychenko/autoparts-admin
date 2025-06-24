import { useState } from 'react';

import { Loader } from '@components/ui';

import { serverApi } from '@/redux/auth/authOperations';

export const UpdateDataBase: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [msg, setMsg] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('#91a2ff7f');

  const handleUpdDBCategories = async () => {
    try {
      setIsLoading(true);
      setMsg('Обновление КАТЕГОРИЙ');
      setStatus('#ffc');

      await serverApi.post(
        '/asg/upd-db-categories',
        {},
        {
          timeout: 10 * 60000, // 1000 = 1секундa
        }
      );

      setMsg('Категории обновлены!');
      setStatus('#1fc528');
    } catch (e) {
      console.log('e', e);
      setStatus('#ff0000');
      setMsg('ОШИБКА-КАТЕГОРИИ НЕ ОБНОВЛЕНЫ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdDBProducts = async () => {
    try {
      setIsLoading(true);
      setMsg('Обновление ТОВАРОВ');
      setStatus('#ffc');

      await serverApi.post(
        '/asg/upd-db-products',
        {},
        {
          timeout: 10 * 60000, // 1000 = 1секундa
        }
      );
      setMsg('ТОВАРЫ обновлены!');
      setStatus('#1fc528');
    } catch (e) {
      console.log('e', e);
      setStatus('#ff0000');
      setMsg('ОШИБКА-ТОВАРЫ НЕ ОБНОВЛЕНЫ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdDBImages = async () => {
    try {
      setIsLoading(true);
      setMsg('Обновление КАРТИНОК');
      setStatus('#ffc');

      await serverApi.post(
        '/asg/upd-db-images',
        {},
        {
          timeout: 10 * 60000, // 1000 = 1секундa
        }
      );
      setMsg('КАРТИНКИ обновлены!');
      setStatus('#1fc528');
    } catch (e) {
      console.log('e', e);
      setStatus('#ff0000');
      setMsg('ОШИБКА-КАРТИНКИ НЕ ОБНОВЛЕНЫ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdSitemap = async () => {
    try {
      setIsLoading(true);
      setMsg('Обновление Sitemap');
      setStatus('#ffc');

      await serverApi.post(
        '/catalog/sitemap',
        {},
        {
          timeout: 20 * 60000, // 1000 = 1секундa
        }
      );
      setMsg('Sitemap обновлен!');
      setStatus('#1fc528');
    } catch (e) {
      console.log('e', e);
      setStatus('#ff0000');
      setMsg('ОШИБКА-Sitemap НЕ ОБНОВЛЕН');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        gap: 16,
        padding: 40,
        width: 440,
      }}
    >
      <p
        style={{
          backgroundColor: status,
          height: 40,
          padding: 4,
          textAlign: 'center',
        }}
      >
        {msg}
      </p>

      <button
        type="button"
        onClick={handleUpdDBCategories}
        disabled={isLoading}
      >
        {!isLoading ? (
          'Обновить базу данных Categories'
        ) : (
          <Loader size={'12'} color="#fff" />
        )}
      </button>

      <button type="button" onClick={() => {}} disabled={isLoading}>
        {!isLoading ? (
          'Обновить наличие и цену Products'
        ) : (
          <Loader size={'12'} color="#fff" />
        )}
      </button>

      <button type="button" onClick={handleUpdDBProducts} disabled={isLoading}>
        {!isLoading ? (
          'Обновить базу данных Products'
        ) : (
          <Loader size={'12'} color="#fff" />
        )}
      </button>

      <button type="button" onClick={handleUpdDBImages} disabled={isLoading}>
        {!isLoading ? (
          'Обновить базу данных Images'
        ) : (
          <Loader size={'16'} color="#fff" />
        )}
      </button>

      <button type="button" onClick={handleUpdSitemap} disabled={isLoading}>
        {!isLoading ? 'Обновить Sitemap' : <Loader size={'16'} color="#fff" />}
      </button>
    </div>
  );
};
