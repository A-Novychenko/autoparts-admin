import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import staticData from '@/data/common.json';
import { serverApi } from '@/redux/auth/authOperations';

import { PaymentSelect } from './OrderPaymentStatus.styled';

const { paymentOptions } = staticData.order;

export const OrderPaymentStatus: React.FC<{
  order: OrderData;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
}> = ({ order, setOrder }) => {
  const handlePaymentStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value === 'true';

    try {
      await serverApi.patch(`/orders/pay/${order._id}`, { isPaid: newStatus });

      setOrder(prev => (prev ? { ...prev, isPaid: newStatus } : prev));

      toast.success('Статус обновлён');
    } catch (err) {
      console.error('Ошибка обновления статуса', err);
      toast.error('Не удалось обновить статус');
    }
  };

  return (
    <PaymentSelect
      value={String(order.isPaid ?? false)}
      status={String(order.isPaid ?? false)}
      onChange={handlePaymentStatusChange}
      aria-label="Статус оплаты"
    >
      {paymentOptions.map(opt => (
        <option key={String(opt.value)} value={String(opt.value)}>
          {opt.label}
        </option>
      ))}
    </PaymentSelect>
  );
};
