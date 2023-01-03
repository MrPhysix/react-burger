import { API_AUTH_REG, API_AUTH_LOGIN } from '../const';
import checkResult from './checkResult';

export function register({ email, password, name }) {
  return fetch(API_AUTH_REG, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => checkResult(res))
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
  })
    .then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}
