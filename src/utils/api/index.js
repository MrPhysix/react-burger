import {
  API_AUTH_LOGIN, API_AUTH_LOGOUT, API_AUTH_REG, API_AUTH_TOKEN, API_USER_REQUEST,
} from '../const';
import checkResult from './checkResult';
import { deleteCookie, getCookie, setCookie } from '../cookie';

export function updateToken() {
  const token = localStorage.getItem('refreshToken');

  return fetch(API_AUTH_TOKEN, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  }).then((res) => checkResult(res))
    .then((res) => {
      console.log('[updateToken res]', res);
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
}

function _checkToken(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error('catch me if you can!');
}

export function register({ email, password, name }) {
  return fetch(API_AUTH_REG, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResult(res))
    .then((res) => res);
}

export function login({ email, password }) {
  return fetch(API_AUTH_LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResult(res))
    .then((res) => res);
}

export function getUserRequest() {
  return fetch(API_USER_REQUEST, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  })
    .then((res) => _checkToken(res))
    .then((res) => (res || 0))
    .catch(() => {
      throw new Error('token auth err');
    });
}

export function setUserInfo({ name, email }) {
  return fetch(API_USER_REQUEST, {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => checkResult(res))
    .then((res) => res);
}

export function logOut() {
  return fetch(API_AUTH_LOGOUT, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    // .then((res) => checkResult(res))
    .then((res) => console.log('ff', res));
}
