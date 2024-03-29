import React, { useState } from 'react';

import {
  EmailInput, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import FormElement from '../../components/FormElement/FormElement';
import { useAuth } from '../../utils/api/auth';
import useForm from '../../hooks/useForm';
import { TAdditionalActions } from '../../types';

const additionalActions: TAdditionalActions = [
  {
    text: 'Вы — новый пользователь?',
    link: {
      path: '/register',
      text: 'Зарегистрироваться',
    },
  },
  {
    text: 'Забыли пароль?',
    link: {
      path: '/forgot-password',
      text: 'Восстановить пароль',
    },
  },
];

function LoginPage() {
  const { signIn }: any = useAuth();

  const { values, handleChange } = useForm({ email: '', password: '' });
  const { email, password } = values;

  //
  const [isLoading, setIsLoading] = useState(false);
  //
  const navigate = useNavigate();
  const location = useLocation();

  // handlers
  const onLogin = (): void => {
    setIsLoading(true);
    signIn({ email, password })
      .finally(() => {
        setIsLoading(false);
        navigate(location.state?.from?.pathname || '/');
      });
  };

  return (
    <main className="main">
      <FormElement
        title="Вход"
        submitText="Войти"
        additionalActions={additionalActions}
        onSubmit={onLogin}
        isActive={password !== '' && email !== ''}
        isLoading={isLoading}
      >
        <EmailInput
          data-cy="email"
          onChange={(e) => handleChange(e)}
          value={email}
          name="email"
          placeholder="E-mail"
          disabled={isLoading}
        />
        <PasswordInput
          data-cy="password"
          onChange={(e) => handleChange(e)}
          value={password}
          name="password"
          autoComplete="on"
          disabled={isLoading}
        />
      </FormElement>
    </main>
  );
}

export default LoginPage;
