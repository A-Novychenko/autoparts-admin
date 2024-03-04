import { useAuth } from '@/hooks';

export const UserInfo: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.login}</p>
    </div>
  );
};
