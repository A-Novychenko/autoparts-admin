import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { makeBadgeColor } from '@/utils';
import { serverApi } from '@/redux/auth/authOperations';

import { CallbackCardProps } from './types';

import {
  Card,
  GridItem,
  SaveBtn,
  Select,
  StatusBadge,
  TextAreaStyled,
} from './CallbackCard.styled';

const statusOptions = [
  { label: 'Новый', value: 'new' },
  { label: 'В обработке', value: 'in-progress' },
  { label: 'Завершен', value: 'done' },
  { label: 'Отклонен', value: 'rejected' },
];

export const CallbackCard: React.FC<CallbackCardProps> = ({
  item,
  setItems,
}) => {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<CallbackItem['status']>('new');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setComment(item.comment || '');
      setStatus(item.status);
      setIsDirty(false);
    }
  }, [item]);

  if (!item) return null;

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as CallbackItem['status'];
    setStatus(newStatus);

    try {
      const { data } = await serverApi.patch(`/orders/callback/${item._id}`, {
        status: newStatus,
      });

      setItems(pS => {
        const updItems = pS.map(el => {
          if (el._id === item._id) {
            return { ...el, status: data.data.status };
          }
          return el;
        });

        return [...updItems];
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

      const { data } = await serverApi.patch(`/orders/callback/${item._id}`, {
        comment,
      });
      setItems(pS => {
        const updItems = pS.map(el => {
          if (el._id === item._id) {
            return { ...el, comment: data.data.comment };
          }
          return el;
        });

        return [...updItems];
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
    <>
      <Card>
        <GridItem>№{item.number}</GridItem>

        <GridItem>{new Date(item.createdAt).toLocaleString('uk-UA')}</GridItem>

        <GridItem>
          <StatusBadge style={{ background: makeBadgeColor(item.status) }}>
            {item.status}
          </StatusBadge>
        </GridItem>

        <GridItem>
          <Select value={status} onChange={handleStatusChange}>
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </GridItem>

        <GridItem>{item.phone}</GridItem>

        <GridItem>
          <TextAreaStyled
            rows={2}
            value={comment}
            onChange={e => {
              setComment(e.target.value);
              setIsDirty(true);
            }}
            onBlur={handleBlur}
            placeholder="Введите комментарий..."
          />
        </GridItem>

        <GridItem>
          {isDirty && (
            <SaveBtn onClick={saveComment} disabled={isSaving}>
              {isSaving ? 'Сохраняется...' : 'Сохранить'}
            </SaveBtn>
          )}
        </GridItem>
      </Card>
    </>
  );
};
