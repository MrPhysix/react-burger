import React, { useState, useRef, useEffect } from 'react';

import {
  EmailInput,
  Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useNavigate } from 'react-router-dom';
import FormElement from '../../components/FormElement/FormElement';
import * as auth from '../../utils/api/auth';

const additionalActions = [
  {
    text: 'Уже зарегистрированы?',
    link: {
      path: '/login',
      text: 'Войти',
    },
  },
];

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => () => {
    console.log('name', name);
    console.log('email', email);
    console.log('password', password);
  }, [name, email, password]);

  // handlers
  const onRegistration = () => {
    auth.register({ email, password, name })
      .then((res) => {
        console.log('onRegistration', res);
        return res;
      })
      .then((res) => res.success && navigate('/login'));
  };

  return (
    <main className="main">
      <FormElement
        title="Регистрация"
        submitText="Зарегистрироваться"
        additionalActions={additionalActions}
        onSubmit={onRegistration}
      >
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          error={false}
          ref={inputRef}
          errorText="Ошибка"
          size="default"
        />
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
        />
      </FormElement>
    </main>
  );
}

export default RegisterPage;
