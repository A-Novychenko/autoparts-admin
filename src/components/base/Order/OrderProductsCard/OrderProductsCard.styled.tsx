import styled from '@emotion/styled';

import { productGridTemp } from '../orderListParams.ts';

interface ThumbSizeProps {
  size: number;
  isModal?: boolean;
}

interface IProductPrice {
  hasPromo: number | null;
}

const COLORS = {
  mainBg: '#c2ffd4',
  primary: '#007bff',
  accent: '#00a6fa',
  muted: '#6b7280',
  border: '#e5e7eb',
  borderOpacity: '#e5e7eb99',
  bg: '#ffffff',
  surface: '#fafafa',
  summary: '#fcf6c2',
};

export const ProductCard = styled.li<{
  isEditing: boolean;
  isAddModal?: boolean;
}>`
  display: grid;
  grid-template-columns: ${productGridTemp};
  align-items: stretch;

  column-gap: 4px;

  background-color: ${({ isEditing }) => (isEditing ? '#fff789' : '#fff')};
  border-bottom: 1px solid #e0e6f0;

  font-size: 14px;
  color: #101340;

  transition: background-color var(--animate);

  &:hover {
    /* background-color: #9bfeb2; */
    background-color: ${({ isEditing }) =>
      isEditing ? '#fff789' : '#bbffcbce'};
  }

  min-width: 900px; /* одинаково с хедером */

  & > p {
    padding: 0px 12px;
    display: flex;
    align-items: center;
  }
  & > p:nth-of-type(2n + 1) {
    background-color: #eceeff5b;
  }
`;

export const ProductNumber = styled.p`
  display: flex;
  align-content: center;
  justify-content: center;
  font-weight: 500;
`;

export const ProductImageBtn = styled.div`
  /* all: unset; 
  cursor: pointer; */

  /* appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0; */
  cursor: pointer;

  transform: scale(1);
  transition: transform var(--animate);

  &:hover,
  &:focus {
    transform: scale(1.15);
  }
`;

export const ProductImageThumb = styled.span<ThumbSizeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  width: ${({ size, isModal }) => (isModal ? '100%' : `${size}px`)};
  height: ${({ size }) => `${size}px`};
  border: 1px solid ${({ isModal }) => (isModal ? 'transparent' : '#ddd;')};
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ isModal }) => (isModal ? 'transparent' : '#fff;')};
`;

export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const ProductDescription = styled.p`
  font-weight: 500;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProductArticle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 0 4px;

  font-family: monospace;
  color: #555;

  border-left: 1px solid #6565653c;
`;

export const ProductInStock = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 500;
  text-align: center;

  padding: 0px 12px !important;
`;

interface IProductInStockItem {
  qty: string;
}

export const ProductInStockItem = styled.span<IProductInStockItem>`
  font-weight: 500;
  text-align: center;
  color: ${({ qty }) => (qty === '0' ? '#f80000' : '#16a34a')};
`;

export const ProductSupplierPrice = styled.p`
  color: #021fff;
`;

export const ProductQtyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductPrice = styled.p<IProductPrice>`
  text-decoration: ${({ hasPromo }) => (hasPromo ? 'line-through' : 'none')};
  color: ${({ hasPromo }) =>
    hasPromo ? 'var(--color-danger)' : 'var(--primary-text)'};
`;
export const ProductPricePromo = styled.p<IProductPrice>`
  color: ${({ hasPromo }) =>
    hasPromo ? 'var(--sales-success-color)' : 'var(--primary-text)'};

  font-weight: ${({ hasPromo }) => (hasPromo ? 700 : 400)};
`;
export const ProductTotal = styled.p`
  font-weight: 700;
`;

export const ProductComment = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
  resize: none;
  font-size: 0.95rem;
  box-sizing: border-box;
`;

export const EditBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CancelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;

  color: var(--red-color);
  background-color: transparent;

  border-radius: 6px;

  transition: color var(--animate), border-color var(--animate);

  &:hover,
  &:focus {
    background-color: var(--red-color-light);
    outline: none;
    border-color: var(--red-color);
  }
`;

export const SaveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 40px;
  height: 40px;

  color: #101340;
  background-color: transparent;

  border-radius: 6px;

  transition: color var(--animate), background-color var(--animate),
    border-color var(--animate);

  &:hover,
  &:focus {
    background-color: var(--main-bg);
    color: var(--green-color);
    outline: none;
    border-color: var(--green-color);
  }
`;

export const EditBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: auto;
  width: 40px;
  height: 40px;

  color: #101340;
  background-color: transparent;

  border-radius: 6px;

  transition: color var(--animate), background-color var(--animate);

  &:hover,
  &:focus {
    background-color: #101340;
    color: #fff;
    outline: none;
    border-color: #101340;
  }
`;
