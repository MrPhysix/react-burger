import React, {
  useEffect, useCallback,
} from 'react';
import {
  createBrowserRouter,
  RouterProvider, Outlet,
} from 'react-router-dom';

import { CirclesWithBar } from 'react-loader-spinner';
//
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Main from '../../pages/Main/Main';
//
import Modal from '../Modal/Modal';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { fetchIngredients } from '../../services/reducers/ingredientsSlice';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPassword from '../../pages/Password/ForgotPasswordPage/ForgotPassword';
import ResetPasswordPage from '../../pages/Password/ResetPasswordPage/ResetPasswordPage';
import Profile from '../../pages/Profile/Profile';
import { ProvideAuth, useAuth } from '../../utils/api/auth';
import Page404 from '../../pages/Page404/Page404';

//

function App() {
  const auth = useAuth();
  const dispatch = useDispatch();
  // states
  const { ingredients } = useSelector((state) => state);
  //
  // callbacks
  const getInitialData = useCallback(
    () => {
      dispatch(fetchIngredients());
    },
    [dispatch],
  );

  // handlers
  const handleErrorModalClose = () => {
    window.location.reload();
  };

  // effects
  useEffect(() => {
    getInitialData();
    auth?.getUser();
  }, []);

  // useEffect(() => console.log('[App] User', user), [user]);

  if (ingredients.status === 'error') return <Modal title="Произошла ошибка..." handleClose={handleErrorModalClose}><ErrorModal handleClose={handleErrorModalClose} /></Modal>;

  // eslint-disable-next-line
  const Layout = () => (
    <ProvideAuth>
      <Header />
      <Outlet />
    </ProvideAuth>
  );

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
          element: (
            <ProtectedRoute>
              {
                ingredients.status === 'request'
                  ? (
                    <CirclesWithBar
                      width="82"
                      color="#4C4CFF"
                      ariaLabel="loading"
                      wrapperClass="loading-spinner"
                    />
                  )
                  : ingredients.ingredients.length > 0 && <Main />
              }
            </ProtectedRoute>
          ),
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
          element: <ProtectedRoute noAuth><ResetPasswordPage /></ProtectedRoute>,
        },
        {
          path: '/profile',
          element: (<ProtectedRoute><Profile /></ProtectedRoute>),
        },
      ],
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;
