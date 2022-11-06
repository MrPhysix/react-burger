import checkResult from './checkResult';

export default function getInitialIngredients(url) {
  return fetch(url)
    .then((res) => checkResult(res))
    .then((res) => res.data);
}
