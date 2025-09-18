import { MdDeleteForever } from 'react-icons/md';

import { ProductCardDelBtn } from './DelBtn.styled';

export const DelBtn: React.FC<{ size?: number; action: () => void }> = ({
  size = 16,
  action,
}) => {
  return (
    <ProductCardDelBtn type="button" onClick={action} title="Удалить элемент">
      <MdDeleteForever size={size} />
    </ProductCardDelBtn>
  );
};
