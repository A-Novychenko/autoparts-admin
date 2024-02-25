import { Button } from '@mui/material';

import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/auth/authOperations';

import staticData from '@/data/common.json';

export const LogoutBtn: React.FC = () => {
  const dispatch = useAppDispatch();

  const { logoutBtn } = staticData.logout;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Button
        variant="outlined"
        type="button"
        onClick={handleLogout}
        sx={{ color: '#fff', borderColor: '#fff' }}
      >
        {logoutBtn}
      </Button>
    </div>
  );
};
