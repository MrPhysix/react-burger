import React, {
  createContext, useContext, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserRequest, login, logOut, setUserInfo,
} from './index';
import { getCookie, setCookie, deleteCookie } from '../cookie';
import { setUserSlice, resetUserSlice } from '../../services/reducers/user';

const AuthContext = createContext(undefined);

export function useProvideAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const token = getCookie('accessToken');

  function getUser() {
    return getUserRequest()
      .then((res) => {
        if (res.success) {
          dispatch(setUserSlice(res));
        }
        return res.success;
      });
  }

  function updateUser({ name, email }) {
    setUserInfo({ name, email })
      .then((res) => {
        if (res.success) {
          dispatch(setUserSlice({ ...user, ...res }));
        }
      });
  }

  async function signIn({ email, password }) {
    const data = await login({ email, password })
      .then((res) => {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      });
    if (data.success) {
      await dispatch(setUserSlice(data));
      return data.success;
    }

    return null;
  }

  function signOut() {
    return logOut()
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
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
