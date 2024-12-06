import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MUIContainer from '@mui/material/Container';

import { ContainerProps } from './types';

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <MUIContainer maxWidth="xl">
        <Box sx={{ height: 'calc(100vh - 64px)' }}>{children}</Box>
      </MUIContainer>
    </>
  );
};
