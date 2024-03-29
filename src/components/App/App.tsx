import React, {
  FC,
  useEffect, useCallback,
  ReactElement,
} from 'react';
import {
  createBrowserRouter,
  RouterProvider, Outlet,
  Navigate, useLocation,
} from 'react-router-dom';

import { CirclesWithBar } from 'react-loader-spinner';
//
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Main from '../../pages/Main/Main';
//
import Modal from '../Modal/Modal';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { fetchIngredients } from '../../services/reducers/ingredients';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPassword from '../../pages/Password/ForgotPasswordPage/ForgotPassword';
import ResetPasswordPage from '../../pages/Password/ResetPasswordPage/ResetPasswordPage';
import Profile from '../../pages/Profile/Profile';
import { ProvideAuth } from '../../utils/api/auth';
import Page404 from '../../pages/Page404/Page404';
import { getCookie } from '../../utils/cookie';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import OrderInfoPage from '../../pages/OrderInfoPage/OrderInfoPage';
import ProfileOrders from '../../pages/Profile/ProfileOrders/ProfileOrders';
import OrdersFeedPage from '../../pages/OrdersFeedPage/OrdersFeedPage';
import { RootState, useAppDispatch } from '../../services';

export function Loader() {
  return (
    <CirclesWithBar
      width="82"
      color="#4C4CFF"
      ariaLabel="loading"
      wrapperClass="loading-spinner"
    />
  );
}

// eslint-disable-next-line
const Layout: FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  // console.log('background', background);

  return (
    <ProvideAuth>
      <Header />
      <Outlet context={background} />
    </ProvideAuth>
  );
};

function App(): ReactElement {
  const dispatch = useAppDispatch();
  // states
  const { ingredients } = useSelector((state: RootState) => state);
  // const background = useOutletContext();
  const { modal } = useSelector((state: RootState) => state);
  // const
  const codeIsRequested = getCookie('codeIsRequested');

  // callbacks
  const getInitialData = useCallback(
    () => {
      dispatch(fetchIngredients() as any);
    },
    [dispatch],
  );

  // handlers
  const handleErrorModalClose: FC = (): any => {
    window.location.reload();
  };

  // effects
  useEffect(() => {
    getInitialData();
  }, []);

  // useEffect(() => console.log('[App] User', user), [user]);

  if (ingredients.status === 'error') return <Modal title="Произошла ошибка..." handleClose={handleErrorModalClose}><ErrorModal handleClose={handleErrorModalClose} /></Modal>;

  const router = createBrowserRouter([
    {
      path: '*',
      element: <Page404 />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element:
                ingredients.status === 'request'
                  ? <Loader />
                  : ingredients.ingredients.length > 0 && <Main />,
        },
        {
          path: '/login',
          element: <ProtectedRoute noAuth><LoginPage /></ProtectedRoute>,
        },
        {
          path: '/register',
          element: <ProtectedRoute noAuth><RegisterPage /></ProtectedRoute>,
        },
        {
          path: '/forgot-password',
          element: <ProtectedRoute noAuth><ForgotPassword /></ProtectedRoute>,
        },
        {
          path: '/reset-password',
          element: (
            <ProtectedRoute noAuth>
              {codeIsRequested
                ? <ResetPasswordPage />
                : <Navigate to="/forgot-password" />}
            </ProtectedRoute>
          ),
        },
        {
          path: '/profile',
          element: (<ProtectedRoute><Profile /></ProtectedRoute>),
        },
        {
          path: '/profile/orders',
          element: (<ProtectedRoute><ProfileOrders /></ProtectedRoute>),
        },
        {
          path: '/profile/orders/:orderId',
          element: (
            <ProtectedRoute>
              {modal.isOpen
                ? <ProfileOrders /> : <OrderInfoPage />}
            </ProtectedRoute>
          ),
        },
        {
          path: '/ingredients/:ingredientId',
          element:
          // eslint-disable-next-line
            ingredients.status === 'request'
              ? <Loader />
              : !modal.isOpen // по идее использовать outletContext,
                // но я не понимаю как в createBrowserRouter его не терять (background === null)
                ? ingredients.ingredients.length > 0 && <IngredientPage />
                : <Main />,
        },
        {
          path: '/feed',
          element: <OrdersFeedPage />,
        },
        {
          path: '/feed/:orderId',
          element: modal.isOpen ? <OrdersFeedPage /> : <OrderInfoPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
