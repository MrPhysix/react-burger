import { API_PASSWORD_STEP1_URL, API_PASSWORD_STEP2_URL } from '../const';
import checkResult from './checkResult';

type TResponseForgotPassword = {
  message: string;
  success: boolean;
}

export function forgotPassword(email: string) {
  return fetch(API_PASSWORD_STEP1_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => checkResult(res))
    .then((res) => res as TResponseForgotPassword);
}

export function resetPassword(password: string, token: string) {
  return fetch(API_PASSWORD_STEP2_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  })
    .then((res) => checkResult(res))
    .then((res) => res as TResponseForgotPassword);
}
