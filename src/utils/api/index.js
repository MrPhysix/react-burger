import {
  API_AUTH_LOGIN, API_AUTH_LOGOUT, API_AUTH_REG, API_AUTH_TOKEN, API_USER_REQUEST,
} from '../const';
import { getCookie } from '../cookie';

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
  });
}

export function register({ email, password, name }) {
  return fetch(API_AUTH_REG, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
}

export function login({ email, password }) {
  return fetch(API_AUTH_LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
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
  });
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
  });
}
