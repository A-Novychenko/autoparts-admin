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

import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ASGPage from '@/pages/ASGPage';
// import OrdersPage from '@/pages/Orders';
import CatalogPage from '@/pages/Catalog';
import ProductsPage from '@/pages/Products';
import ClientsPage from '@/pages/ClientsPage';
import UsersPage from '@/pages/UsersPage';
import ErrorPage from '@/pages/ErrorPage';

import OrdersListPage from '@/pages/OrdersListPage';
import OrderDetailsPage from '@/pages/OrderDetailsPage';
import VinRequestListPage from '@/pages/VinRequestListPage';
import VinRequestPage from '@/pages/VinRequestPage';
import CallbackListPage from '@/pages/CallbackListPage';
import UserShipmentsPage from '@/pages/UserShipmentsPage';
import { OrdersLayout } from './OrdersLayout';
import { OrdersDetailsLayout } from './OrdersDetailsLayout';
import { AppWrapper } from './App';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <AppWrapper element={<Layout />} />
          <ToastContainer />
        </>
      }
      errorElement={<ErrorPage />}
    >
      {/* публичный роут */}
      <Route
        index
        element={
          <RestrictedRoute redirectTo="dashboard" component={<LoginPage />} />
        }
      />

      {/* приватная часть */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute redirectTo="/" component={<DashboardLayout />} />
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="asg" element={<ASGPage />} />

        <Route path="orders" element={<OrdersLayout />}>
          <Route index element={<OrdersListPage />} />
          <Route path="order-list" element={<OrdersListPage />} />
          <Route path="vin-requests" element={<VinRequestListPage />} />
          <Route path="callback" element={<CallbackListPage />} />
        </Route>

        <Route path="orders" element={<OrdersDetailsLayout />}>
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="vin-request/:id" element={<VinRequestPage />} />
        </Route>

        <Route path="catalog" element={<CatalogPage />} />

        <Route path="products" element={<ProductsPage />} />

        <Route path="clients" element={<ClientsPage />} />

        <Route
          path="users"
          element={
            <AdminRoute redirectTo="dashboard" component={<UsersPage />} />
          }
        />

        <Route path="user-shipments" element={<UserShipmentsPage />} />
      </Route>
    </Route>
  )
);

export default router;
