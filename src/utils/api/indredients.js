import checkResult from './checkResult';
import { API_INGREDIENTS_URL } from '../const';

export default function getInitialIngredients() {
  return fetch(API_INGREDIENTS_URL)
    .then((res) => checkResult(res))
    .then((res) => res.data);
}
