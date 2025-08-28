// import React, { useEffect } from 'react';
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
// } from 'react-router-dom';

// import { ToastContainer } from 'react-toastify';

// import { Layout } from '@/components/Layout';
// import { DashboardLayout } from '@/components/DashboardLayout';

// import { PrivateRoute } from '@/components/PrivateRoute';
// import { RestrictedRoute } from '@/components/RestrictedRoute';
// import { AdminRoute } from '@/components/AdminRoute';

// import { useAppDispatch } from '@/redux/hooks';
// import { refreshUser } from '@/redux/auth/authOperations';
// import { useAuth } from '@/hooks';

// import LoginPage from '@/pages/LoginPage';
// import DashboardPage from '@/pages/DashboardPage';
// import ASGPage from '@/pages/ASGPage';
// import OrdersPage from '@/pages/Orders';
// import ProductsPage from '@/pages/Products';
// import UsersPage from '@/pages/UsersPage';
// import ErrorPage from '@/pages/ErrorPage';

// import OrdersListPage from '@/pages/OrdersListPage';
// import OrderDetailsPage from '@/pages/OrderDetailsPage';
// import VinRequestListPage from '@/pages/VinRequestListPage';
// import VinRequestPage from '@/pages/VinRequestPage';
// import CallbackListPage from '@/pages/CallbackListPage';

// const AppWrapper = ({ element }: { element: React.ReactNode }) => {
//   const dispatch = useAppDispatch();
//   const { isRefreshing } = useAuth();

//   useEffect(() => {
//     dispatch(refreshUser());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (isRefreshing) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <span className="text-lg font-semibold">Завантаження...</span>
//       </div>
//     );
//   }

//   return <>{element}</>;
// };

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       path="/"
//       element={
//         <>
//           <AppWrapper element={<Layout />} />
//           {/* ToastContainer один раз на всё приложение */}
//           <ToastContainer />
//         </>
//       }
//       errorElement={<ErrorPage />}
//     >
//       {/* публичный роут */}
//       <Route
//         index
//         element={
//           <RestrictedRoute redirectTo="/dashboard" component={<LoginPage />} />
//         }
//       />

//       {/* приватная часть */}
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute redirectTo="/" component={<DashboardLayout />} />
//         }
//       >
//         <Route index element={<DashboardPage />} />
//         <Route path="asg" element={<ASGPage />} />

//         <Route path="orders" element={<OrdersPage />}>
//           <Route index element={<OrdersListPage />} />
//           <Route path="order-list" element={<OrdersListPage />} />
//           <Route path="order/:id" element={<OrderDetailsPage />} />
//           <Route path="vin-requests" element={<VinRequestListPage />} />
//           <Route path="vin-request/:id" element={<VinRequestPage />} />
//           <Route path="callback" element={<CallbackListPage />} />
//         </Route>

//         <Route path="products" element={<ProductsPage />} />

//         <Route
//           path="users"
//           element={
//             <AdminRoute redirectTo="/dashboard" component={<UsersPage />} />
//           }
//         />
//       </Route>
//     </Route>
//   )
// );

// export default router;
import React, { useRef } from 'react';
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
import CatalogPage from '@/pages/Catalog';
import ProductsPage from '@/pages/Products';
import UsersPage from '@/pages/UsersPage';
import ErrorPage from '@/pages/ErrorPage';

import OrdersListPage from '@/pages/OrdersListPage';
import OrderDetailsPage from '@/pages/OrderDetailsPage';
import VinRequestListPage from '@/pages/VinRequestListPage';
import VinRequestPage from '@/pages/VinRequestPage';
import CallbackListPage from '@/pages/CallbackListPage';

const AppWrapper = ({ element }: { element: React.ReactNode }) => {
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

        <Route path="orders" element={<OrdersPage />}>
          <Route index element={<OrdersListPage />} />
          <Route path="order-list" element={<OrdersListPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="vin-requests" element={<VinRequestListPage />} />
          <Route path="vin-request/:id" element={<VinRequestPage />} />
          <Route path="callback" element={<CallbackListPage />} />
        </Route>

        <Route path="catalog" element={<CatalogPage />} />

        <Route path="products" element={<ProductsPage />} />

        <Route
          path="users"
          element={
            <AdminRoute redirectTo="dashboard" component={<UsersPage />} />
          }
        />
      </Route>
    </Route>
  )
);

export default router;
