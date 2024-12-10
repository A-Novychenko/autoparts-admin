import { RotatingLines } from 'react-loader-spinner';

export const Loader: React.FC = () => {
  return (
    <RotatingLines
      visible={true}
      width="96"
      strokeWidth="5"
      strokeColor="#101340"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};
