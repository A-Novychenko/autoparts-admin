import styled from '@emotion/styled';

interface StatusSelectProps {
  status: string;
}

export const PaymentSelect = styled.select<StatusSelectProps>`
  padding: 4px 6px;
  border-radius: 6px;

  border: none;
  background-color: ${props =>
    props.status === 'true' ? 'var(--green-color)' : 'var(--color-danger)'};

  font-size: 12px;
  font-weight: 700;

  color: var(--secondary-text);

  cursor: pointer;
`;
