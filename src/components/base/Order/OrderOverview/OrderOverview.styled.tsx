import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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

export const ChooseBtn = styled.button`
  position: absolute;
  top: -15px;
  right: 10px;

  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  margin-left: auto;
  padding: 2px 4px;
  background-color: #fff;
  color: #101340e1;
  border: 1px solid #101340e1;
  border-radius: 6px;

  font-size: 12px;

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

export const OrderOverviewSection = styled.section`
  display: flex;
  gap: 16px;
  height: 320px;
  flex-shrink: 0;
  padding: 10px;

  font-size: 14px;

  background-color: ${COLORS.bg};
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

export const NumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OrderNumber = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

export const DataBox = styled.div`
  position: relative;

  flex-grow: 1;
  padding: 10px;
  border-radius: 16px;
  border: var(--border-card);
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

export const DataLabel = styled.p`
  position: absolute;
  top: -10px;
  left: 12px;
  padding: 0 4px;
  background-color: var(--main-bg);
  line-height: 1;
  color: var(--dark-slate-color);
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

export const OrderClientBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 322px;
  gap: 16px;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 10px;
  width: 322px;
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

export const ShipmentsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;

  max-height: 70vh;
  overflow-y: auto;
`;

export const DeliveryBtn = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  margin-left: auto;
  padding: 2px 4px;
  background-color: #fff;
  color: #101340e1;
  border: 1px solid #101340e1;
  border-radius: 6px;

  font-size: 12px;

  margin-bottom: 20px;

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
