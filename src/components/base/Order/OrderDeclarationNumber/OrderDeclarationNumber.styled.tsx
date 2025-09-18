import styled from '@emotion/styled';

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

export const DataLabel = styled.p`
  position: absolute;
  top: -10px;
  left: 12px;
  padding: 0 4px;
  background-color: var(--main-bg);
  line-height: 1;
  color: var(--dark-slate-color);
`;

export const DataItemTitle = styled.p`
  color: var(--primary-text-opacity);
`;

export const DataItemDeclarationNumberValue = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 84px;
  /* width: 60%; */
  margin-left: auto;
  padding-right: 10px;
`;

export const AddDeclarationNumberBtn = styled.button`
  display: flex;
  gap: 4px;
  width: fit-content;
  margin: auto;

  padding: 2px 4px;
  background-color: var(--green-color);
  color: var(--secondary-text);
  border: 1px solid transparent;
  outline: none;

  transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    border-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--green-color-opacity);
    color: var(--green-color);
    border-color: var(--green-color);
  }
`;

export const DataItemDeclarationNumberValueInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
