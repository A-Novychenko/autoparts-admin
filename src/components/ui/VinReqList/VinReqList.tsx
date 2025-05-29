// import { useEffect, useState } from 'react';

// import { serverApi } from '@/redux/auth/authOperations';
// import { formatDateToUkrainian } from '@/utils';
// import { DetailsBtn, StyledTable } from './VinReqList.styled';
// import { PageContainer } from '../PageContainer';

// type Item = {
//   _id: string;
//   number: string;
//   status: string;
//   name: string;
//   phone: string;
//   vinCode: string;
//   message: string;
//   createdAt: string;
// };

// export const VinReqList = () => {
//   const [vinReqItems, setVinReqItems] = useState<Item[]>([]);
//   useEffect(() => {
//     const getAllVinReqItems = async () => {
//       const { data } = await serverApi.get('/orders/vin-requests');

//       setVinReqItems(data.vinRequestItems);
//     };

//     getAllVinReqItems();
//   }, []);

//   return (
//     <PageContainer>
//       <div style={{ padding: '32px 20px' }}>
//         <StyledTable>
//           <thead>
//             <tr>
//               <th>Номер</th>
//               <th>Статус</th>
//               <th>Имя</th>
//               <th>Телефон</th>
//               <th>VIN</th>
//               <th>Сообщение</th>
//               <th>Дата</th>
//               <th>Действие</th>
//             </tr>
//           </thead>

//           <tbody>
//             {vinReqItems.map(item => (
//               <tr key={item._id} data-status={item.status}>
//                 <td>{item.number}</td>
//                 <td>{item.status}</td>
//                 <td>{item.name}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.vinCode}</td>
//                 <td
//                   style={{
//                     maxWidth: 300,
//                   }}
//                 >
//                   <span
//                     style={{
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 1,
//                       WebkitBoxOrient: 'vertical',
//                       whiteSpace: 'normal',
//                     }}
//                   >
//                     {item.message}
//                   </span>
//                 </td>
//                 <td>{formatDateToUkrainian(item.createdAt)}</td>
//                 <td>
//                   {/* <button>Детальнее</button> */}
//                   <DetailsBtn to={`/dashboard/orders/vin-request/${item._id}`}>
//                     Открыть
//                   </DetailsBtn>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </StyledTable>
//       </div>
//     </PageContainer>
//   );
// };

import { useEffect, useState } from 'react';
import { serverApi } from '@/redux/auth/authOperations';
import { formatDateToUkrainian } from '@/utils';
import {
  Card,
  Container,
  GridItem,
  Header,
  List,
  OpenBtn,
  StatusBadge,
} from './VinReqList.styled';

type Item = {
  _id: string;
  number: string;
  status: string;
  name: string;
  phone: string;
  vinCode: string;
  message: string;
  createdAt: string;
};

export const VinReqList = () => {
  const [vinReqItems, setVinReqItems] = useState<Item[]>([]);

  useEffect(() => {
    const getAllVinReqItems = async () => {
      const { data } = await serverApi.get('/orders/vin-requests');
      setVinReqItems(data.vinRequestItems);
    };

    getAllVinReqItems();
  }, []);

  const badgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return '#2a67ff';
      case 'in-progress':
        return '#ff8018';
      case 'done':
        return '#22c55e';
      case 'rejected':
        return '#ff2a2a';

      default:
        return '#2a67ff';
    }
  };

  return (
    <Container>
      <Header>
        <div>№ / Статус</div>
        <div>Ім’я</div>
        <div>Телефон</div>
        <div>VIN</div>
        <div>Повідомлення</div>
        <div>Дата / Перегляд</div>
      </Header>

      <List>
        {vinReqItems.map(item => (
          <Card key={item._id}>
            <GridItem>
              №{item.number}
              <StatusBadge style={{ background: badgeColor(item.status) }}>
                {item.status}
              </StatusBadge>
            </GridItem>
            <GridItem>{item.name}</GridItem>
            <GridItem>{item.phone}</GridItem>
            <GridItem>{item.vinCode}</GridItem>
            <GridItem>{item.message || '-'}</GridItem>
            <GridItem>
              {formatDateToUkrainian(item.createdAt)}
              <div style={{ marginTop: 4 }}>
                <OpenBtn to={`/dashboard/orders/vin-request/${item._id}`}>
                  Відкрити
                </OpenBtn>
              </div>
            </GridItem>
          </Card>
        ))}
      </List>
    </Container>
  );
};
