import styled from '@emotion/styled';

import { makeBadgeColor } from '@/utils';

interface StatusSelectProps {
  status: string;
}

export const StatusSelect = styled.select<StatusSelectProps>`
  padding: 4px 6px;
  border-radius: 6px;

  border: 1px solid ${props => makeBadgeColor(props.status)};
  background: ${props => makeBadgeColor(props.status)};

  font-size: 12px;
  font-weight: 700;
  color: ${props => (props.status === 'new' ? '#fff' : '#000')};
  outline: none;

  cursor: pointer;
`;
