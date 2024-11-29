import { serverApi } from '@/redux/auth/authOperations';

export const UpdateDataBase: React.FC = () => {
  const handleUpdDBProducts = async () => {
    try {
      serverApi;
      await serverApi.post(
        '/asg/upd-db-products',
        {},
        {
          timeout: 60000, // 1000 = 1секундa
        }
      );
    } catch (e) {
      console.log('e', e);
    }
  };

  const handleUpdDBImages = async () => {
    try {
      serverApi;
      await serverApi.post(
        '/asg/upd-db-images',
        {},
        {
          timeout: 60000, // 1000 = 1секундa
        }
      );
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <>
      <button type="button" onClick={handleUpdDBProducts}>
        Обновить базу данных Products
      </button>

      <button type="button" onClick={handleUpdDBImages}>
        Обновить базу данных Images
      </button>
    </>
  );
};
