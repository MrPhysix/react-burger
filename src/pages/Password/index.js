import { forgotPassword, resetPassword } from '../../utils/api/password';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const additionalActions = [
  {
    text: 'Вспомнили пароль?',
    link: {
      path: '/login',
      text: 'Войти',
    },
  },
];

export function forgotRequest(email) {
  return forgotPassword(email)
    .then((res) => {
      if (res.success) {
        setCookie('codeIsRequested', res.success, { expires: 240 });
      }
      return res.success;
    });
}

export function resetRequest(password, code) {
  resetPassword(password, code)
    .then((res) => {
      if (res.success) {
        deleteCookie('codeIsRequested');
      }
    });
}

// export function ForgotRequest(email) {
//   const [codeIsRequested, setCodeIsRequested] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//
//   setIsLoading(true);
//   forgotPassword(email)
//     .then((res) => res.success && setCodeIsRequested(true)).finally((res) => {
//       setIsLoading(false);
//       return res.success && navigate('/reset-password');
//     });
//
//   return {
//     isLoading, codeIsRequested,
//   };
// }
//
// export function ResetRequest(password, code) {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//
//   setIsLoading(true);
//   resetPassword(password, code)
//     .then((res) => res.success && navigate('/'));
//
//   return {
//     isLoading,
//   };
// }
