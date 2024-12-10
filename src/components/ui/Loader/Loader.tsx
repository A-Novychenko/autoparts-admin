import { RotatingLines } from 'react-loader-spinner';

import { LoaderProps } from './types';

export const Loader: React.FC<LoaderProps> = ({
  size = '96',
  color = '#101340',
}) => {
  return (
    <RotatingLines
      visible={true}
      width={size}
      strokeWidth="5"
      strokeColor={color}
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};
