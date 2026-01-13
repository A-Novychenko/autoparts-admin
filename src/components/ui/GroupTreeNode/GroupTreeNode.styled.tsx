import styled from '@emotion/styled';

interface NodeButtonProps {
  level: number;
  isOpen: boolean;
  hasChildren: boolean;
  isSelected?: boolean;
}

export const TreeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const TreeItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;
`;

export const NodeButtonWrap = styled.div<{ level: number }>`
  padding-left: ${({ level }) => `${level * 20 + 12}px`};
`;

export const NodeButton = styled.button<NodeButtonProps>`
  /* Базовый сброс стилей кнопки */
  appearance: none;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;

  /* Flex для выравнивания контента */
  display: flex;
  align-items: center;
  height: 36px;
  padding-right: 12px;

  font-size: 14px;
  color: ${({ isSelected }) => (isSelected ? '#101340' : '#585858')};
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '400')};
  background-color: ${({ isSelected }) =>
    isSelected ? '#EEF2FF' : 'transparent'};

  transition: all 0.2s ease;
  border-radius: 6px; /* Легкое скругление */
  margin-bottom: 2px; /* Микро-отступ между элементами */

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? '#EEF2FF' : '#F5F5F5'};
    color: ${({ isSelected }) => (isSelected ? '#4F46E5' : '#000')};
    outline: none;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }
`;

export const Text = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  overflow: hidden;
`;

export const IconWrapper = styled.span<{
  isOpen: boolean;
  isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  fill: ${({ isSelected }) => (isSelected ? '#101340' : '#585858')};
  transition: transform 0.2s ease;

  /* Поворот иконки если открыто */
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};

  &:hover {
    fill: ${({ isSelected }) => (isSelected ? '#4F46E5' : '#000')};
  }
`;

export const MarginBadge = styled.span`
  margin-left: auto; /* Прижимаем вправо */
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  background: rgba(0, 0, 0, 0.04);
  padding: 2px 6px;
  border-radius: 4px;
`;
