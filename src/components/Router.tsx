import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { Layout } from '@/components/Layout';
import { DashboardLayout } from '@/components/DashboardLayout';

import { PrivateRoute } from '@/components/PrivateRoute';
import { RestrictedRoute } from '@/components/RestrictedRoute';
import { AdminRoute } from '@/components/AdminRoute';

import { useAppDispatch } from '@/redux/hooks';
import { refreshUser } from '@/redux/auth/authOperations';
import { useAuth } from '@/hooks';

import LoginPage from '@/pages/LoginPage';

import DashboardPage from '@/pages/DashboardPage';

import ASGPage from '@/pages/ASGPage';
import OrdersPage from '@/pages/Orders';
import ProductsPage from '@/pages/Products';
import UsersPage from '@/pages/UsersPage';
import ErrorPage from '@/pages/ErrorPage';

import OrdersListPage from '@/pages/OrdersListPage';
import OrderDetailsPage from '@/pages/OrderDetailsPage';
import VinRequestListPage from '@/pages/VinRequestListPage';
import VinRequestPage from '@/pages/VinRequestPage';

const AppWrapper = ({ element }: { element: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <b>Refreshing user...</b>;
  return (
    <>
      {element}
      <ToastContainer />
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppWrapper element={<Layout />} />}
      errorElement={<ErrorPage />}
    >
      <Route
        index
        element={
          <RestrictedRoute redirectTo="/dashboard" component={<LoginPage />} />
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

        <Route path="orders" element={<OrdersPage />}>
          <Route index element={<OrdersListPage />} />
          <Route path="list" element={<OrdersListPage />} />
          <Route path="vin-requests" element={<VinRequestListPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="vin-request/:id" element={<VinRequestPage />} />
        </Route>

        <Route path="products" element={<ProductsPage />} />

        <Route
          path="users"
          element={
            <AdminRoute redirectTo="/dashboard" component={<UsersPage />} />
          }
        />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default router;
