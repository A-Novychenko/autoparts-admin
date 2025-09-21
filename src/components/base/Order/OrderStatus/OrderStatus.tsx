import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { serverApi } from '@/redux/auth/authOperations';

import staticData from '@/data/common.json';

import { StatusSelect } from './OrderStatus.styled';

const { statusOptions } = staticData.order;

export const OrderStatus: React.FC<{
  order: OrderData;
  client: IClient | null;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
}> = ({ order, setOrder, client }) => {
  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as OrderItem['status'];

    try {
      const { data } = await serverApi.patch(`/orders/${order._id}`, {
        status: newStatus,
      });

      setOrder(prev =>
        prev
          ? { ...prev, status: data.updStatus, updatedBy: data.updatedBy }
          : prev
      );

      toast.success('Статус обновлён');
    } catch (err) {
      console.error('Ошибка обновления статуса', err);
      toast.error('Не удалось обновить статус');
    }
  };
  return (
    <StatusSelect
      value={order.status || 'new'}
      status={order.status || 'new'}
      onChange={handleStatusChange}
      aria-label="Статус заказа"
      disabled={!client || order.isAccounted}
      title={client ? 'Статус заказа' : 'Выберите клиента!'}
    >
      {statusOptions.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StatusSelect>
  );
};
