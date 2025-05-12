import { VinReqDetail } from '@/components/base';
import { serverApi } from '@/redux/auth/authOperations';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Item = {
  _id: string;
  number: string;
  status: 'new' | 'inprogress' | 'done' | 'rejected';
  phone: string;
  vinCode: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  engine: string;
  fuel: string;
  comment: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export default function VinRequestPage() {
  const { id } = useParams();

  const [item, setItem] = useState<Item>({} as Item);

  useEffect(() => {
    const getVinRequestData = async () => {
      const { data } = await serverApi.get(`/orders/vin-requests/${id}`);

      console.log('data', data);

      setItem(data.data);
    };

    getVinRequestData();
  }, [id]);

  return (
    <>
      <h1 className="visually-hidden">Страница ЗАПРОСА</h1>

      <VinReqDetail item={item} />
    </>
  );
}
