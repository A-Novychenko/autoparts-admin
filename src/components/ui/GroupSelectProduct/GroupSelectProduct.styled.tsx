import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const GroupForm = styled.form`
  background-color: rgba(24, 39, 251, 0.13);
  display: flex;
  justify-content: center;
  gap: 20px;

  padding: 4px;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const GroupLabel = styled.label`
  display: flex;
`;

const inputStyles = css`
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  border: 2px solid transparent;
  background: #f3f4f6;
  color: #111827;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:hover {
    background: #e5e7eb;
  }

  &:focus {
    background: #ffffff;
    border-color: #268be3;
    box-shadow: 0 4px 12px rgba(38, 139, 227, 0.15);
  }

  /* Если ошибка */
  &[aria-invalid='true'] {
    border-color: #ef4444;
    background: #fee2e2;
  }
`;

export const StyledSelect = styled.select`
  ${inputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  padding-right: 40px;
  cursor: pointer;
`;
