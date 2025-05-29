import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { serverApi } from '@/redux/auth/authOperations';
import { formatDateToUkrainian } from '@/utils';

import {
  InfoItem,
  Label,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductList,
  SaveBtn,
  Section,
  SectionTitle,
  Select,
  TextAreaStyled,
  Wrapper,
} from './OrderDetail.styled';

const statusOptions = [
  { label: 'Новый', value: 'new' },
  { label: 'В обработке', value: 'in-progress' },
  { label: 'Завершен', value: 'done' },
  { label: 'Отклонен', value: 'rejected' },
];

export const OrderDetail = ({
  order,
}: {
  order: OrderItem | null;
  setOrder: React.Dispatch<React.SetStateAction<OrderItem | null>>;
}) => {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<OrderItem['status']>('new');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (order) {
      setComment(order.comment || '');
      setStatus(order.status);
      setIsDirty(false);
    }
  }, [order]);

  if (!order) return null;

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as OrderItem['status'];
    setStatus(newStatus);

    try {
      await serverApi.patch(`/orders/${order._id}`, {
        status: newStatus,
      });
      toast.success('Статус обновлён');
    } catch (error) {
      console.error('Не вдалося оновити статус', error);
      toast.error('Помилка при оновленні статусу');
    }
  };

  const saveComment = async () => {
    if (!isDirty) return;

    try {
      setIsSaving(true);
      await serverApi.patch(`/orders/${order._id}`, {
        comment,
      });
      toast.success('Комментарий сохранён');
      setIsDirty(false);
    } catch (error) {
      console.error('Помилка при збереженні коментаря', error);
      toast.error('Не вдалося зберегти коментар');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBlur = () => {
    saveComment(); // авто-збереження при blur
  };

  return (
    <Wrapper>
      <h2>Замовлення №{order.number}</h2>

      <Section>
        <SectionTitle>Інформація про замовлення</SectionTitle>
        <InfoItem>
          <b>Статус:</b>
          <Select value={status} onChange={handleStatusChange}>
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </InfoItem>
        <InfoItem>
          <b>Імя:</b> {order.name}
        </InfoItem>
        <InfoItem>
          <b>Телефон:</b> {order.phone}
        </InfoItem>
        <InfoItem>
          <b>Email:</b> {order.email}
        </InfoItem>
        <InfoItem>
          <b>Сообщение:</b> {order.message || '-'}
        </InfoItem>
        <InfoItem>
          <b>Доставка:</b>{' '}
          {order.delivery === 'pickup' ? 'Самовивіз' : 'Нова Пошта'}
        </InfoItem>
        {order.delivery === 'post' && (
          <>
            <InfoItem>
              <b>Город:</b> {order.deliveryCity}
            </InfoItem>
            <InfoItem>
              <b>Отделение:</b> {order.postOffice}
            </InfoItem>
          </>
        )}
        <InfoItem>
          <b>Оплата:</b> {order.payment}
        </InfoItem>
        <InfoItem>
          <b>Создано:</b> {formatDateToUkrainian(order.createdAt)}
        </InfoItem>
      </Section>

      <Section>
        <Label>Комментарий</Label>
        <TextAreaStyled
          rows={4}
          value={comment}
          onChange={e => {
            setComment(e.target.value);
            setIsDirty(true);
          }}
          onBlur={handleBlur}
          placeholder="Введите комментарий..."
        />

        {isDirty && (
          <SaveBtn onClick={saveComment} disabled={isSaving}>
            {isSaving ? 'Сохраняется...' : 'Сохранить'}
          </SaveBtn>
        )}
      </Section>

      <Section>
        <SectionTitle>Товари</SectionTitle>
        <InfoItem>Кількість товарів: {order.products.length}</InfoItem>
        <ProductList>
          {order.products.map((product: OrderProduct) => (
            <ProductCard key={product._id}>
              <ProductImage src={product.img} alt={product.name} />
              <ProductInfo>
                <p>
                  <b>{product.name}</b>
                </p>
                <p>Артикул: {product.article}</p>
                <p>Ціна: {product.price} грн</p>
                {product.price_promo && (
                  <p style={{ color: 'red' }}>
                    Ціна зі знижкою: {product.price_promo} грн
                  </p>
                )}
                <p>Кількість: {product.quantity}</p>
                <p>В наявності: {product.availability}</p>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductList>
      </Section>
    </Wrapper>
  );
};
