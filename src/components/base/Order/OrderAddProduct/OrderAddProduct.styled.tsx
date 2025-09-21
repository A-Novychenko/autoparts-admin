import styled from '@emotion/styled';

export const Wrap = styled.div`
  position: sticky;
  bottom: 0px;
  /* margin: 8px 0 8px auto; */
  padding: 8px;
`;
export const AddProductBtn = styled.button`
  border: none;
  padding: 0;
  display: flex;

  margin-left: auto;

  background-color: #008000;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 0 8px;

  transition: background-color 0.25s ease, transform 0.15s ease,
    box-shadow 0.25s ease;

  &:hover {
    background-color: #006400; /* чуть темнее */
    transform: translateY(-2px); /* лёгкий подъем */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* тень при наведении */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 128, 0, 0.4); /* фокус-обводка */
  }

  &:active {
    transform: translateY(0); /* убираем подъем при клике */
    background-color: #005000; /* еще чуть темнее при нажатии */
  }

  &:disabled {
    transform: translateY(0); /* убираем подъем при клике */
    background-color: #00500083; /* еще чуть темнее при нажатии */
    box-shadow: none;
  }
`;
