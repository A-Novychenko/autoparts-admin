// import { useState, useEffect } from 'react';
// import {
//   Container,
//   Header,
//   InfoGrid,
//   Block,
//   Label,
//   Value,
//   SelectStyled,
//   TextAreaStyled,
//   CreatedDate,
// } from './VinReqDetail.styled';
// import { VinReqDetailItem, VinReqDetailProps } from './types';

// const statusOptions = [
//   { label: 'Новый', value: 'new' },
//   { label: 'В обработке', value: 'inprogress' },
//   { label: 'Завершен', value: 'done' },
//   { label: 'Отклонен', value: 'rejected' },
// ];

// export const VinReqDetail: React.FC<VinReqDetailProps> = ({ item }) => {
//   const [comment, setComment] = useState('');
//   const [status, setStatus] = useState<VinReqDetailItem['status']>('new');

//   useEffect(() => {
//     if (item) {
//       setComment(item.comment || '');
//       setStatus(item.status);
//     }
//   }, [item]);

//   if (!item) return <Container>Загрузка...</Container>;

//   return (
//     <Container>
//       <Header>
//         <span>VIN-запрос № {item.number}</span>

//         <CreatedDate>
//           {new Date(item.createdAt).toLocaleString('uk-UA', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//           })}
//         </CreatedDate>
//       </Header>

//       <InfoGrid>
//         <Block>
//           <Label>Статус</Label>
//           <SelectStyled
//             value={status}
//             onChange={e =>
//               setStatus(e.target.value as VinReqDetailItem['status'])
//             }
//           >
//             {statusOptions.map(opt => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </SelectStyled>
//         </Block>

//         <Block>
//           <Label>Имя</Label>
//           <Value>{item.name}</Value>
//         </Block>

//         <Block>
//           <Label>Телефон</Label>
//           <Value>{item.phone}</Value>
//         </Block>

//         <Block>
//           <Label>VIN-код</Label>
//           <Value>{item.vinCode}</Value>
//         </Block>

//         <Block>
//           <Label>Марка</Label>
//           <Value>{item.brand}</Value>
//         </Block>

//         <Block>
//           <Label>Модель</Label>
//           <Value>{item.model}</Value>
//         </Block>

//         <Block>
//           <Label>Год выпуска</Label>
//           <Value>{item.year}</Value>
//         </Block>

//         <Block>
//           <Label>Двигатель</Label>
//           <Value>{item.engine}</Value>
//         </Block>

//         <Block>
//           <Label>Топливо</Label>
//           <Value>{item.fuel}</Value>
//         </Block>

//         <Block style={{ gridColumn: '1 / -1' }}>
//           <Label>Сообщение</Label>
//           <Value>{item.message || '—'}</Value>
//         </Block>

//         <Block style={{ gridColumn: '1 / -1' }}>
//           <Label>Комментарий</Label>
//           <TextAreaStyled
//             rows={4}
//             value={comment}
//             onChange={e => setComment(e.target.value)}
//             placeholder="Введите комментарий..."
//           />
//         </Block>
//       </InfoGrid>
//     </Container>
//   );
// };

import { useState, useEffect } from 'react';

import {
  Container,
  Header,
  InfoGrid,
  Block,
  Label,
  Value,
  SelectStyled,
  TextAreaStyled,
  CreatedDate,
  SaveButton,
} from './VinReqDetail.styled';
import { VinReqDetailItem, VinReqDetailProps } from './types';
import { toast } from 'react-toastify';
import { serverApi } from '@/redux/auth/authOperations';

const statusOptions = [
  { label: 'Новый', value: 'new' },
  { label: 'В обработке', value: 'inprogress' },
  { label: 'Завершен', value: 'done' },
  { label: 'Отклонен', value: 'rejected' },
];

export const VinReqDetail: React.FC<VinReqDetailProps> = ({ item }) => {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<VinReqDetailItem['status']>('new');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setComment(item.comment || '');
      setStatus(item.status);
      setIsDirty(false);
    }
  }, [item]);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as VinReqDetailItem['status'];
    setStatus(newStatus);

    try {
      await serverApi.patch(`/orders/vin-requests/${item._id}`, {
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
      // await axios.patch(`/api/vin-requests/${item._id}/comment`, { comment });
      await serverApi.patch(`/orders/vin-requests/${item._id}`, {
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

  if (!item) return <Container>Загрузка...</Container>;

  return (
    <Container>
      <Header>
        <span>VIN-запрос № {item.number}</span>
        <CreatedDate>
          {new Date(item.createdAt).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </CreatedDate>
      </Header>

      <InfoGrid>
        <Block>
          <Label>Статус</Label>
          <SelectStyled value={status} onChange={handleStatusChange}>
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </SelectStyled>
        </Block>

        <Block>
          <Label>Имя</Label>
          <Value>{item.name}</Value>
        </Block>

        <Block>
          <Label>Телефон</Label>
          <Value>{item.phone}</Value>
        </Block>

        <Block>
          <Label>VIN-код</Label>
          <Value>{item.vinCode}</Value>
        </Block>

        <Block>
          <Label>Марка</Label>
          <Value>{item.brand}</Value>
        </Block>

        <Block>
          <Label>Модель</Label>
          <Value>{item.model}</Value>
        </Block>

        <Block>
          <Label>Год выпуска</Label>
          <Value>{item.year}</Value>
        </Block>

        <Block>
          <Label>Двигатель</Label>
          <Value>{item.engine}</Value>
        </Block>

        <Block>
          <Label>Топливо</Label>
          <Value>{item.fuel}</Value>
        </Block>

        <Block style={{ gridColumn: '1 / -1' }}>
          <Label>Сообщение</Label>
          <Value>{item.message || '—'}</Value>
        </Block>

        <Block style={{ gridColumn: '1 / -1' }}>
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
            <SaveButton onClick={saveComment} disabled={isSaving}>
              {isSaving ? 'Сохраняется...' : 'Сохранить'}
            </SaveButton>
          )}
        </Block>
      </InfoGrid>
    </Container>
  );
};
