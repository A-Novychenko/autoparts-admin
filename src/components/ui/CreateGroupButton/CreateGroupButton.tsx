import { Dispatch, SetStateAction } from 'react';

import { StyledFloatingButton } from './CreateGroupButton.styled';

export const CreateGroupButton: React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  return (
    <StyledFloatingButton onClick={() => setIsOpen(true)}>
      Создать группу
    </StyledFloatingButton>
  );
};
