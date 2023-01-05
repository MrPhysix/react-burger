import React, { useState } from 'react';

import {
  EmailInput, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  // handlers
  const onLogin = () => {
    auth.signIn({ email, password })
      .then((res) => res && setTimeout(() => navigate('/profile'), 1000));
  };

  return (
    <main className="main">
      <FormElement
        title="Вход"
        submitText="Войти"
        additionalActions={additionalActions}
        onSubmit={onLogin}
        isActive={password !== '' || email !== ''}
      >
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          placeholder="E-mail"
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          autoComplete="on"
        />
      </FormElement>
    </main>
  );
}

export default LoginPage;
