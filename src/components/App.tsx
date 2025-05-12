import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { DashboardLayout } from './DashboardLayout';
import ASGPage from '@/pages/ASGPage';
import OrdersPage from '@/pages/Orders';
import VinRequestPage from '@/pages/VinRequestPage';
import ProductsPage from '@/pages/Products';
import UsersPage from '@/pages/UsersPage';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { useAuth } from '@/hooks';
import { refreshUser } from '@/redux/auth/authOperations';
import ErrorPage from '@/pages/ErrorPage';
import { AdminRoute } from './AdminRoute';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isRefreshing, isAuthenticated } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  console.log('isAuthenticatedAPP', isAuthenticated);

  return (
    <>
      {isRefreshing ? (
        <b>Refreshing user...</b>
      ) : (
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
              <Route
                path="orders/vin-request/:id"
                element={<VinRequestPage />}
              />
              <Route path="products" element={<ProductsPage />} />

              <Route
                path="users"
                element={
                  <AdminRoute
                    redirectTo="/dashboard"
                    component={<UsersPage />}
                  />
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
      <ToastContainer />;
    </>
  );
};
