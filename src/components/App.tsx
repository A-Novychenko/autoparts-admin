import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { useAppSelector } from '@/redux/hooks';
import { DashboardLayout } from './DashboardLayout';
import ASGPage from '@/pages/ASGPage';
import OrdersPage from '@/pages/Orders';
import UsersPage from '@/pages/UsersPage';
// import { useAppDispatch } from "@/redux/hooks";

export const App = () => {
  // const dispatch = useAppDispatch();
  // const {isRefreshing} = useAuth();

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  // return isRefreshing ? (
  //   <b>Refreshing user...</b>
  // ) : (
  const isAuthenticated = useAppSelector(s => s.auth.isAuthenticated);
  console.log('isAuthenticatedAPP', isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <RestrictedRoute
              redirectTo="/dashboard"
              component={<LoginPage />}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute redirectTo="/" component={<DashboardLayout />} />
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="asg" element={<ASGPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
  // );
};
