import { MdDeleteForever } from 'react-icons/md';

import { ProductCardDelBtn } from './DelBtn.styled';

export const DelBtn: React.FC<{
  size?: number;
  action: () => void;
  title?: string;
  disabled?: boolean;
}> = ({ size = 16, action, title = 'Удалить элемент', disabled = false }) => {
  return (
    <ProductCardDelBtn
      type="button"
      onClick={action}
      title={title}
      disabled={disabled}
    >
      <MdDeleteForever size={size} />
    </ProductCardDelBtn>
  );
};
