// import { Link } from 'react-router-dom';
// import styled from '@emotion/styled';

// export const StyledTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   font-size: 14px;
//   border-collapse: separate;
//   border-spacing: 0 4px;

//   th,
//   td {
//     padding: 4px 16px;
//     border: 1px solid #e4e4e4;
//     text-align: left;
//   }

//   thead {
//     background-color: #f5f5f5;
//   }

//   tbody tr:hover {
//     background-color: #f0f8ff;
//   }

//   /* Цвета в зависимости от статуса */
//   tbody tr[data-status='new'] {
//     /* background-color: #ffecb3; */
//     background-color: #ffc107;

//     font-weight: 700;
//     /* color: #f00; */
//   }

//   tbody tr[data-status='inprogress'] {
//     background-color: #ffeac4;
//   }

//   tbody tr[data-status='done'] {
//     /* background-color: #d9fdd3; */
//     color: #4f8a44;
//   }

//   tbody tr[data-status='rejected'] {
//     /* background-color: #ffd6d6; */
//     color: #6d1818;
//   }
// `;

// export const DetailsBtn = styled(Link)`
//   padding: 6px 10px;
//   border: none;
//   background-color: #0070f3;
//   color: white;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #005dc1;
//   }
// `;

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  width: 100%;
  padding: 32px 16px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const gridTemplate = `
  140px 150px 150px 200px 1fr 160px
`;

export const Header = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: ${gridTemplate};
    gap: 8px;
    align-items: center;
    padding: 12px 16px;
    font-weight: 600;
    font-size: 14px;
    background: #f9fafb;
    border-radius: 10px;
    margin-bottom: 8px;

    position: sticky;
    top: 120px;
    z-index: 10;
  }
`;

export const Card = styled.article`
  display: grid;
  grid-template-columns: ${gridTemplate};
  gap: 8px;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-size: 14px;
  margin-bottom: 8px;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const GridItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusBadge = styled.span`
  background: #22c55e;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 6px;
`;

export const OpenBtn = styled(Link)`
  background: #2563eb;
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  justify-self: start;

  &:hover {
    background: #1d4ed8;
  }
`;
