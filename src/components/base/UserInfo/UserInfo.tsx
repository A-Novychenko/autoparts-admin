import { FaUser } from 'react-icons/fa';

import { useAuth } from '@/hooks';

export const UserInfo: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ marginRight: 40 }}>
      {/* <p>{user?.name}</p> */}
      <p>
        <FaUser /> {user?.login}
      </p>
    </div>
  );
};
