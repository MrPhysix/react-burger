import React, {
  useEffect, useCallback,
} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
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
//

function App() {
  const dispatch = useDispatch();
  // states
  const { ingredients } = useSelector((state) => state);

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
  useEffect(() => getInitialData(), []);

  if (ingredients.status === 'error') return <Modal title="Произошла ошибка..." handleClose={handleErrorModalClose}><ErrorModal handleClose={handleErrorModalClose} /></Modal>;

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute isLogged>
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
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password',
      element: <ResetPasswordPage />,
    },
    {
      path: '/profile',
      element: (<ProtectedRoute isLogged><Profile /></ProtectedRoute>),
    },

  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
