import { Button } from './Btn.styled';

export const Btn: React.FC<{
  type?: 'button' | 'submit';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  title?: string;
  backgroundColorFirst?: string;
  backgroundColorSecond?: string;
  color?: string;
  padding?: string;
  shadowColor?: string;
}> = ({
  type = 'button',
  onClick,
  children,
  disabled,
  title = '',
  backgroundColorFirst,
  backgroundColorSecond,
  color,
  padding,
  shadowColor,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      backgroundColorFirst={backgroundColorFirst}
      backgroundColorSecond={backgroundColorSecond}
      color={color}
      padding={padding}
      shadowColor={shadowColor}
      disabled={disabled}
      title={title}
    >
      {children}
    </Button>
  );
};
