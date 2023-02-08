import React, {
  createContext, useContext, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import {
  getUserRequest, login, logOut, setUserInfo, updateToken,
} from './index';
import { getCookie, setCookie, deleteCookie } from '../cookie';
import { setUserSlice, resetUserSlice } from '../../services/reducers/user';
import checkResult from './checkResult';
import { useAppDispatch } from '../../services';

const AuthContext = createContext(undefined);

export function useProvideAuth() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state) => state);
  const token = getCookie('accessToken');

  function getUser() {
    return getUserRequest()
      .then((res) => checkResult(res))
      .then((res) => {
        if (res?.success) {
          dispatch(setUserSlice(res));
        }
        return res.success;
      })
      .catch(() => {
        updateToken()
          .then((res) => checkResult(res))
          .then((res) => {
            deleteCookie('accessToken');
            return res;
          })
          .then((res) => {
            if (res.success) {
              localStorage.setItem('refreshToken', res.refreshToken);
              setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
            }
            return res;
          });
      });
  }

  function updateUser({ name, email }) {
    setUserInfo({ name, email })
      .then((res) => checkResult(res))
      .then((res) => {
        if (res.success) {
          dispatch(setUserSlice({ ...user, ...res }));
        }
      });
  }

  async function signIn({ email, password }) {
    const data = await login({ email, password })
      .then((res) => checkResult(res))
      .then((res) => {
        deleteCookie('accessToken');
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      });
    if (data.success) {
      await dispatch(setUserSlice(data));
      deleteCookie('codeIsRequested');
      return data.success;
    }

    return null;
  }

  function signOut() {
    return logOut()
      // .then((res) => checkResult(res))
      .then(() => {
        dispatch(resetUserSlice());
        deleteCookie('accessToken');
        localStorage.clear();
      });
  }

  useEffect(() => {
    if (token) getUser();
  }, []);

  return {
    user, getUser, updateUser, signIn, signOut,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  // eslint-disable-next-line
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
