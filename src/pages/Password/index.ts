import { forgotPassword, resetPassword } from '../../utils/api/password';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TAdditionalActions } from '../../types';

export const additionalActions: TAdditionalActions = [
  {
    text: 'Вспомнили пароль?',
    link: {
      path: '/login',
      text: 'Войти',
    },
  },
];

export function forgotRequest(email: string) {
  return forgotPassword(email)
    .then((res) => {
      if (res.success) {
        setCookie('codeIsRequested', res.success, { expires: 240 });
      }
      return res.success;
    }).catch((err) => new Error(`Ошибка: ${err}`));
}

export function resetRequest(password: string, code: string) {
  resetPassword(password, code)
    .then((res) => {
      if (res.success) {
        deleteCookie('codeIsRequested');
      }
    }).catch((err) => new Error(`Ошибка: ${err}`));
}
