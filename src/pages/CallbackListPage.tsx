import { useEffect, useState } from 'react';

import { CallbackList } from '@/components/base';

import { serverApi } from '@/redux/auth/authOperations';

export default function CallbackListPage() {
  const [items, setItems] = useState<CallbackItem[]>([]);

  useEffect(() => {
    const getAllCallbackData = async () => {
      const { data } = await serverApi.get('/orders/callback');

      setItems(data.data);
    };

    getAllCallbackData();
  }, []);

  return (
    <>
      <h1 className="visually-hidden">Страница запроса обратного звонка</h1>

      <CallbackList items={items} setItems={setItems} />
    </>
  );
}
