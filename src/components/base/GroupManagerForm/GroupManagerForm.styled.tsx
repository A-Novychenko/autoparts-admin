import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;

  margin: 0 auto;
`;

export const FieldRow = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) =>
    columns ? `repeat(${columns}, 1fr)` : '1fr'};
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const Label = styled.label`
  font-size: 11px;
  text-transform: uppercase;
  color: #9ca3af;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-left: 4px;
`;

export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 11px;
  margin-left: 4px;
  font-weight: 500;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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

export const StyledInput = styled.input`
  ${inputStyles}
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

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 12px;
`;

export const CancelButton = styled.button`
  background: transparent;
  border: none;
  color: #6b7280;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #111827;
    background: #f3f4f6;
  }
`;

export const PrimaryButton = styled.button<{ isLoading?: boolean }>`
  padding: 14px 32px;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff;

  background: linear-gradient(135deg, #101340 0%, #268be3 100%);
  background-size: 200% auto;
  box-shadow: 0 8px 20px -5px rgba(38, 139, 227, 0.5);

  cursor: pointer;
  outline: none;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  opacity: ${({ isLoading }) => (isLoading ? 0.7 : 1)};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px -10px rgba(38, 139, 227, 0.6);
    background-position: right center;
  }

  &:active {
    transform: translateY(2px) scale(0.98);
    box-shadow: 0 4px 10px -2px rgba(79, 70, 229, 0.4);
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-top: 10px;
`;

export const ToggleLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`;

export const HiddenCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: linear-gradient(135deg, #101340 0%, #268be3 100%);
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d1d5db;
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
