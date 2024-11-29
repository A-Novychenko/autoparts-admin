import { Link, Typography } from '@mui/material';

import staticData from '@/data/common.json';

import { CopyrightProps } from './types';

export const Copyright: React.FC<CopyrightProps> = props => {
  const { name, typeShop } = staticData.copyright;

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {` ${'© '} ${new Date().getFullYear()} `}
      <Link color="inherit" href="https://autoparts-liard.vercel.app">
        {typeShop} {name}
      </Link>{' '}
      {'.'}
    </Typography>
  );
};
