import styled from '@emotion/styled';
import { productGridTemp } from '../orderListParams.ts';

export const ProductList = styled.ul<{ isAccounted: boolean }>`
  display: flex;
  flex-direction: column;

  background-color: ${({ isAccounted }) =>
    isAccounted ? 'var(--accounting-order)' : '#fff1c7'};
`;

export const ProductSection = styled.section<{ isAccounted: boolean }>`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 10px;
  background-color: ${({ isAccounted }) =>
    isAccounted ? 'var(--accounting-order)' : 'transparent'};
`;

export const ProductsHeader = styled.ul<{ isAccounted: boolean }>`
  position: sticky;
  top: 0;

  display: grid;
  grid-template-columns: ${productGridTemp};

  align-items: stretch;

  column-gap: 4px;

  background-color: ${({ isAccounted }) =>
    isAccounted ? 'var(--accounting-order)' : '#f1f3f9'};
  border-bottom: 2px solid #d0d6e6;

  font-size: 12px;
  font-weight: 600;
  color: #101340;
  text-transform: uppercase;
  letter-spacing: -0.7px;
  line-height: 1;

  min-width: 900px; /* одинаково со строками */
`;

export const ProductsHeaderItem = styled.li<{ isAccounted: boolean }>`
  padding: 10px 12px;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  &:nth-of-type(2n + 1) {
    /* background-color: #e0e3ff4c; */
    background-color: ${({ isAccounted }) =>
      isAccounted ? 'var(--accounting-order)' : '#e0e3ff4c'};
  }
`;

export const ProductWrap = styled.div`
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.2), -4px 0 6px rgba(0, 0, 0, 0.2);
`;
