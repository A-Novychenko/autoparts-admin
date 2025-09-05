import { useAuth } from '@/hooks';
import { refreshUser } from '@/redux/auth/authOperations';
import { useAppDispatch } from '@/redux/hooks';
import { useRef } from 'react';

export const AppWrapper = ({ element }: { element: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isRefreshing } = useAuth();

  // гарантируем, что dispatch(refreshUser()) вызовется ровно один раз
  const startedRef = useRef(false);

  if (!startedRef.current) {
    startedRef.current = true;
    // Запускаем refresh синхронно при первом рендере
    // (выполняется один раз, потому что startedRef теперь true)
    dispatch(refreshUser());
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <span>Завантаження...</span>
      </div>
    );
  }

  // Пока идёт асинхронный процесс — показываем loader
  if (isRefreshing) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <span>Завантаження...</span>
      </div>
    );
  }

  // После завершения refresh — рендерим переданный layout
  return <>{element}</>;
};
