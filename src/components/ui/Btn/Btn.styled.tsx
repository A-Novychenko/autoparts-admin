import styled from '@emotion/styled';

type ButtonTypes = {
  backgroundColorFirst?: string;
  backgroundColorSecond?: string;
  color?: string;
  padding?: string;
  shadowColor?: string;
};

export const Button = styled.button<ButtonTypes>`
  padding: ${({ padding }) => (padding ? padding : '16px 36px')};
  border-radius: 999px;
  border: none;
  box-sizing: border-box;

  font-weight: 700;
  letter-spacing: 0.5px;
  color: ${({ color }) => (color ? color : '#ffffff')};

  background: linear-gradient(
    135deg,
    ${({ backgroundColorFirst }) =>
        backgroundColorFirst ? backgroundColorFirst : '#101340'}
      0%,
    ${({ backgroundColorSecond }) =>
        backgroundColorSecond ? backgroundColorSecond : '#268be3'}
      100%
  );
  background-size: 200% auto;

  box-shadow: 0 8px 20px -5px ${({ shadowColor }) => (shadowColor ? shadowColor : 'rgba(38, 139, 227, 0.5)')};

  cursor: pointer;
  outline: none;

  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: translateY(-5px) scale(1.03);

    box-shadow: 0 20px 35px -10px ${({ shadowColor }) => (shadowColor ? shadowColor : 'rgba(38, 139, 227, 0.5)')};

    background-position: right center;
  }

  &:active {
    transform: translateY(2px) scale(0.98);
    box-shadow: 0 4px 10px -2px rgba(79, 70, 229, 0.4);
    transition: all 0.1s ease;
  }

  &:disabled {
    background: gray;
    box-shadow: 0 8px 20px -5px rgba(116, 116, 116, 0.5);
  }

  &:hover&:disabled,
  &:active&:disabled {
    transform: translateY(0px) scale(1);

    box-shadow: 0 8px 20px -5px rgba(116, 116, 116, 0.5);

    background-position: right center;
  }
`;
