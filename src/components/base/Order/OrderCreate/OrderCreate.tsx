import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { serverApi } from '@/redux/auth/authOperations';

import { MdAddBox } from 'react-icons/md';

import { Card, CreateOrderBtn } from './OrderCreate.styled';

export const OrderCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    try {
      const { data } = await serverApi.post('/orders/add-cms-order');

      toast.success(`Новый заказ ${data.order.number} успешно создан`);

      navigate(`/dashboard/orders/order/${data.order._id}`);
    } catch (e) {
      console.log('e', e);
      toast.error('Ошибка! Заказ не создан');
    }
  };

  return (
    <Card>
      <CreateOrderBtn onClick={handleCreateOrder}>
        <MdAddBox size={20} />
        Создать заказ
      </CreateOrderBtn>
    </Card>
  );
};
