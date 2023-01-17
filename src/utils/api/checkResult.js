export default function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error(res);
}
