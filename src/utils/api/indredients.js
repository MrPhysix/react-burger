export default function getInitialIngredients(url) {
  const _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  };

  return fetch(url)
    .then((res) => _checkResult(res))
    .then((res) => res.data);
}
