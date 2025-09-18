import styled from '@emotion/styled';

export const ProductCardDelBtn = styled.button`
  all: unset; /* сброс ВСЕХ встроенных стилей браузера */
  cursor: pointer;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;
  border-radius: 6px;

  transition: color var(--animate), background-color var(--animate);

  &:hover,
  &:focus {
    background-color: #ff0000;
    color: #fff;
    outline: none;
  }
`;
