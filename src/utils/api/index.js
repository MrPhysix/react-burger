import {
  API_AUTH_LOGIN, API_AUTH_LOGOUT, API_AUTH_REG, API_USER_REQUSET,
} from '../const';
import checkResult from './checkResult';
import { getCookie } from '../cookie';

export function register({ email, password, name }) {
  return fetch(API_AUTH_REG, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
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
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}

export function getUserRequest() {
  return fetch(API_USER_REQUSET, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  }).then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}

export function setUserInfo({ name, email }) {
  return fetch(API_USER_REQUSET, {
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
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
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
  }).then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}
