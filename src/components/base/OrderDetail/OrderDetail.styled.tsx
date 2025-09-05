import { makeBadgeColor } from '@/utils';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface StatusSelectProps {
  status: string;
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

/* Controls area */
export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 220px;
`;

export const DocBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const BaseBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  svg {
    width: 16px;
    height: 16px;
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const DocBtnInv = styled(BaseBtn)`
  background: ${COLORS.accent};
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 166, 250, 0.12);
`;

export const DocBtn = styled(BaseBtn)`
  background: ${COLORS.surface};
  color: #111827;
  border: 1px solid ${COLORS.border};
`;

/* Select */
export const StatusSelect = styled.select<StatusSelectProps>`
  padding: 4px 6px;
  border-radius: 6px;

  border: 1px solid ${props => makeBadgeColor(props.status)};
  background: ${props => makeBadgeColor(props.status)};

  font-size: 12px;
  font-weight: 700;
  color: ${props => (props.status === 'new' ? '#fff' : '#000')};
  outline: none;
`;

/* Textarea */
export const TextAreaStyled = styled.textarea`
  width: 100%;
  min-height: 124px;
  height: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
  resize: none;
  font-size: 0.95rem;
  box-sizing: border-box;
`;

/* Save button */
export const SaveBtn = styled.button`
  margin-top: 8px;
  padding: 8px 12px;
  background: ${COLORS.primary};
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

export const BackBtn = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;

  padding: 0px 4px;
  /* background-color: #6262622f; */
  background-color: #ffffff;
  color: #101340e1;
  border: 1px solid #101340e1;
  border-radius: 6px;

  transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    border-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #f2f2f2;
    color: #101340;
    border-color: #101340;
  }
`;
export const ChooseBtn = styled.button`
  position: absolute;
  top: -15px;
  right: 10px;

  display: flex;
  gap: 4px;
  width: fit-content;
  margin-left: auto;
  padding: 2px 4px;
  background-color: #fff;
  color: #101340e1;
  border: 1px solid #101340e1;

  transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    border-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #f2f2f2;
    color: #101340;
    border-color: #101340;
  }
`;

export const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
`;

/* OrderOverview---SECTION */
export const OrderOverviewSection = styled.section`
  display: flex;
  gap: 16px;
  height: 300px;
  flex-shrink: 0;
  padding: 10px;

  font-size: 14px;

  background-color: ${COLORS.bg};
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

export const OrderClientBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 322px;
  /* gap: 16px; */
`;

export const NumberWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 16px;
`;

export const NumberInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* gap: 12px; */
  /* margin-bottom: 8px; */
  /* padding: 10px; */
`;

export const OrderNumber = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

export const MsgBox = styled.div``;
export const Msg = styled.button`
  all: unset; /* сбрасывает все браузерные стили */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  color: var(--primary-text);
  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
    outline: none;
  }
`;

export const DataBox = styled.div`
  position: relative;

  flex-grow: 1;
  padding: 10px;
  border-radius: 16px;
  border: var(--border-card);
`;

export const DataLabel = styled.p`
  position: absolute;
  top: -10px;
  left: 12px;
  padding: 0 4px;
  background-color: var(--main-bg);
  line-height: 1;
  color: var(--dark-slate-color);
`;

export const DataItem = styled.li`
  display: flex;
  column-gap: 4px;
  width: 300px;

  overflow-x: auto;

  /* Настройка скроллбара только для этого элемента */
  &::-webkit-scrollbar {
    height: 4px; /* очень тонкий по высоте */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* убираем фон */
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3); /* полупрозрачный ползунок */
    border-radius: 2px; /* скругление */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const DataItemTitle = styled.p`
  color: var(--primary-text-opacity);
`;

export const DataItemValue = styled.p`
  font-weight: 700;
`;

export const ShipmentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 10px;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 10px;
  width: 322px;
`;

/* Products---SECTION */
export const ProductSection = styled.section`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 10px;
`;
export const ProductWrap = styled.div`
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.2), -4px 0 6px rgba(0, 0, 0, 0.2);
`;

export const ProductList = styled.ul`
  display: flex;
  flex-direction: column;

  background-color: #fff1c7;
`;

const productGridTemp =
  '50px 40px 3fr 180px 100px 80px 60px 80px 50px 50px 100px 80px 120px 40px';

export const ProductsHeader = styled.ul`
  position: sticky;
  top: 0;

  display: grid;
  grid-template-columns: ${productGridTemp};

  align-items: stretch;

  column-gap: 4px;

  background-color: #f1f3f9;
  border-bottom: 2px solid #d0d6e6;

  font-size: 12px;
  font-weight: 600;
  color: #101340;
  text-transform: uppercase;
  letter-spacing: -0.7px;
  line-height: 1;

  min-width: 900px; /* одинаково со строками */
`;

export const ProductsHeaderItem = styled.li`
  padding: 10px 12px;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  &:nth-child(2n + 1) {
    background-color: #e0e3ff4c;
  }
`;

export const ProductCard = styled.li`
  display: grid;
  grid-template-columns: ${productGridTemp};
  align-items: stretch;

  column-gap: 4px;

  background-color: #fff;
  border-bottom: 1px solid #e0e6f0;

  font-size: 14px;
  color: #101340;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: #9bfeb2;
  }

  min-width: 900px; /* одинаково с хедером */

  & > p {
    padding: 0px 12px;
    display: flex;
    align-items: center;
  }
  & > p:nth-child(2n + 1) {
    background-color: #eceeff5b;
  }
`;

export const ProductNumber = styled.p`
  /* text-align: center; */
  display: flex;
  align-content: center;
  justify-content: center;
  font-weight: 500;
`;

export const ProductImageThumb = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fafafa;

  display: flex;
  align-items: center;
  justify-content: center;
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

export const ProductArticle = styled.p`
  font-family: monospace;
  color: #555;
  text-align: center;
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

interface IProductPrice {
  hasPromo: number | null;
}
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
  /* min-height: 124px; */
  height: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
  resize: none;
  font-size: 0.95rem;
  box-sizing: border-box;
`;

export const ProductCardDelBtn = styled.button`
  all: unset; /* сброс ВСЕХ встроенных стилей браузера */
  cursor: pointer;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;

  transition: color var(--animate), background-color var(--animate);

  &:hover,
  &:focus {
    background-color: #ff0000;
    color: #fff;
    outline: none;
  }
`;

/* SummarySection---SECTION */
export const SummarySection = styled.section`
  display: flex;
  flex-direction: column;
  height: 120px;
  flex-shrink: 0;
  padding: 10px;
  background-color: ${COLORS.bg};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SummaryWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const SummaryBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

export const SummaryBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryInfoBox = styled.div`
  display: flex;
  gap: 10px;
`;

export const SummaryInfoItem = styled.div`
  width: 240px;
`;
