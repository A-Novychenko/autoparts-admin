import { serverApi } from '@/redux/auth/authOperations';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserShipmentsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [shipmentList, setShipmentList] = useState<IShipment[]>();

  const { id, from } = location.state || {};

  useEffect(() => {
    const fetchShipments = async () => {
      const { data } = await serverApi.get(`/clients/shipments/${id}`);

      setShipmentList(data.shipments);
    };

    fetchShipments();
  }, [id]);

  return (
    <>
      <p>Редактируем доставку для заказа {id}</p>
      <button onClick={() => navigate(from || '/')}>Вернуться</button>

      <ul style={{ display: 'flex', gap: 8 }}>
        {shipmentList &&
          shipmentList.map(shipmentItem => {
            const {
              _id,
              name,
              phone,
              delivery,
              deliveryCity,
              postOffice,
              payment,
            } = shipmentItem;
            return (
              <li key={_id}>
                <span>{name}</span>
                <span>{phone}</span>
                <span>{delivery}</span>
                <span>{deliveryCity}</span>
                <span>{postOffice}</span>
                <span>{payment}</span>
                {/* <button
                    type="button"
                    onClick={() => {
                      setCurrentShipment(shipmentItem);
                    }}
                  >
                    Выбрать
                  </button> */}
              </li>
            );
          })}
      </ul>
    </>
  );
}
