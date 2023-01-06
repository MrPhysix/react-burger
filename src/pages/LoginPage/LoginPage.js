import React, { useState } from 'react';

import {
  EmailInput, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import FormElement from '../../components/FormElement/FormElement';
import { useAuth } from '../../utils/api/auth';

const additionalActions = [
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
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //
  const [isLoading, setIsLoading] = useState(false);
  //

  // handlers
  const onLogin = () => {
    setIsLoading(true);
    signIn({ email, password }).finally(() => setIsLoading(false));
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          placeholder="E-mail"
          disabled={isLoading}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
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
