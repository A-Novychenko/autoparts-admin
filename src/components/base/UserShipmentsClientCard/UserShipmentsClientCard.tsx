import React from 'react';

import { Label, Title, Wrap } from './UserShipmentsClientCard.styled';

export const UserShipmentsClientCard: React.FC<{ client: IClient }> = ({
  client,
}) => {
  return (
    <Wrap>
      <Title>{client?.name ?? ''}</Title>
      <Label>Код клиента: {client?.clientCode ?? ''}</Label>
    </Wrap>
  );
};
