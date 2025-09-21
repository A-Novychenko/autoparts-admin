import styled from '@emotion/styled';

export const Card = styled.div`
  position: fixed;

  bottom: 10px;
  right: 196px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* background-color: #fff; */
  background-color: #5a5a5a46;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  color: #101340;
`;

export const CreateOrderBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--green-color);
  color: #fff;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  /* width: 100%; */

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
`;

export const FormSection = styled.div`
  margin-bottom: 20px;
  background: #f9fafb;
  padding: 16px;
  border-radius: 12px;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
