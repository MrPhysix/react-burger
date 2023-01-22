export default function
checkResult<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  throw new Error(`Error ${res.status}`);
}
