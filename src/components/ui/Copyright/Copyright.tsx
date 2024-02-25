import { Link, Typography } from '@mui/material';

import staticData from '@/data/common.json';

import { CopyrightProps } from './types';

export const Copyright: React.FC<CopyrightProps> = props => {
  const { name } = staticData.copyright;

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://autoparts-liard.vercel.app">
        {name}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
