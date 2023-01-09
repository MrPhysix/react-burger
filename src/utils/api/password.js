import { API_PASSWORD_STEP1_URL, API_PASSWORD_STEP2_URL } from '../const';
import checkResult from './checkResult';

export function forgotPassword(email) {
  return fetch(API_PASSWORD_STEP1_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}

export function resetPassword(password, token) {
  return fetch(API_PASSWORD_STEP2_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  })
    .then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}
