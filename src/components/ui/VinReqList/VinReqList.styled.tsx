import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border-collapse: separate;
  border-spacing: 0 4px;

  th,
  td {
    padding: 4px 16px;
    border: 1px solid #e4e4e4;
    text-align: left;
  }

  thead {
    background-color: #f5f5f5;
  }

  tbody tr:hover {
    background-color: #f0f8ff;
  }

  /* Цвета в зависимости от статуса */
  tbody tr[data-status='new'] {
    /* background-color: #ffecb3; */
    background-color: #ffc107;

    font-weight: 700;
    /* color: #f00; */
  }

  tbody tr[data-status='inprogress'] {
    background-color: #ffeac4;
  }

  tbody tr[data-status='done'] {
    /* background-color: #d9fdd3; */
    color: #4f8a44;
  }

  tbody tr[data-status='rejected'] {
    /* background-color: #ffd6d6; */
    color: #6d1818;
  }
`;

export const DetailsBtn = styled(Link)`
  padding: 6px 10px;
  border: none;
  background-color: #0070f3;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005dc1;
  }
`;
