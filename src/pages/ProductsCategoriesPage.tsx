import { useEffect, useState } from 'react';

import { serverApi } from '@/redux/auth/authOperations';

export default function ProductsCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const { data } = await serverApi.get('catalog/category-with-main');

        console.log('first', data);

        setCategories(data.categories);
      } catch (e) {
        console.log('e', e);
      }
    };

    getAllCategories();
  }, []);

  return (
    <>
      <h2>Категории</h2>
      <ul style={{ overflow: 'auto', maxHeight: '1000px' }}>
        {categories &&
          categories.map(({ id, name, img }) => (
            <li key={id} style={{ display: 'flex', gap: 8 }}>
              {img ? (
                <img src={img} width={30} height={30} />
              ) : (
                <span style={{ width: 30, height: 30 }}></span>
              )}
              <p>
                <span>{id}</span>
                <span> {name}</span>
              </p>
            </li>
          ))}
      </ul>

      {categories && categories?.length < 1 && <p>Нет категорий</p>}
    </>
  );
}

// {
//   "id": 1,
//   "createdAt": {
//     "$date": "2024-11-29T15:04:03.976Z"
//   },
//   "img": "",
//   "name": "Мастильні матеріали",
//   "parent_id": 0,
//   "updatedAt": {
//     "$date": "2024-11-29T15:04:03.976Z"
//   }
// }
