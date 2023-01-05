import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import {
  getUserRequest, login, logOut, setUserInfo,
} from './index';
import { getCookie, setCookie, deleteCookie } from '../cookie';

const AuthContext = createContext(undefined);

export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const token = getCookie('accessToken');

  function getUser() {
    return getUserRequest()
      .then((res) => {
        if (res.success) {
          setUser(res.user);
        }
        return res.success;
      });
  }

  function updateUser({ name, email }) {
    setUserInfo({ name, email })
      .then((res) => {
        console.log('updateUser', res);
        if (res.success) {
          setUser({ ...user, ...res.user });
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
      await setUser(data.user);
      return data.success;
    }

    return null;
  }

  function signOut() {
    return logOut()
      .then((res) => {
        console.log('signOut', res);
        setUser(null);
        deleteCookie('accessToken');
        localStorage.clear();
      });
  }

  useEffect(() => {
    console.log(token);
    if (token) getUser().then((res) => console.log('if token', res));
  }, [token]);

  useEffect(() => {
    console.log('[useEffect] User', user);
  }, [user]);

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
