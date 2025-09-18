import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import { UserShipments } from '@/components/base';

import { serverApi } from '@/redux/auth/authOperations';

export default function UserShipmentsPage() {
  const location = useLocation();
  const { id, from } = (location.state || {}) as { id?: string; from?: string };

  const [client, setClient] = useState<IClient | null>(null);

  const [shipmentList, setShipmentList] = useState<IShipment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await serverApi.get(`/clients/shipment/${id}`);
        setShipmentList(Array.isArray(data?.shipments) ? data.shipments : []);
        setClient(data?.client ? data.client : null);
      } catch (err) {
        console.error(err);
        toast.error('Не удалось загрузить варианты доставки');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <UserShipments
      id={id}
      from={from}
      client={client}
      shipmentList={shipmentList}
      loading={loading}
      setLoading={setLoading}
      setShipmentList={setShipmentList}
    />
  );
}
