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
      <button type="button" onClick={handleLogout}>
        {logoutBtn}
      </button>
    </div>
  );
};
