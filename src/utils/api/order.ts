import checkResult from './checkResult';
import { API_ORDER_URL } from '../const';
import { TIngredient } from '../../types';
import { getCookie } from '../cookie';

export function getOrderDetails(ingredients: Array<TIngredient>) {
  return fetch(API_ORDER_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({ ingredients }),
  })
    .then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}

export function getOrderInfoById(id: any) {
  return fetch(`${API_ORDER_URL}/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  })
    .then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}
