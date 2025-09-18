import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d1d5db;
  background-color: #f3f4f6;
  padding: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #e5e7eb;
    outline: none;
  }
`;

export const Tip = styled.div`
  position: absolute;
  left: 66.666667%;
  top: 0;
  transform: translate(-50%, -100%);
  white-space: nowrap;
  border-radius: 0.375rem;
  background-color: #000;
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  pointer-events: none;
`;
