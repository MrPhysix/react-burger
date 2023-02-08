import checkResult from './checkResult';
import { API_ORDER_URL } from '../const';
import { TIngredient } from '../../types';

export default function getOrderDetails(ingredients: Array<TIngredient>) {
  return fetch(API_ORDER_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  })
    .then((res) => checkResult(res))
    .then((res) => res)
    .catch((err) => new Error(`Ошибка: ${err}`));
}
