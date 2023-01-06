import React, { useState, useRef } from 'react';

import {
  EmailInput,
  Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useNavigate } from 'react-router-dom';
import FormElement from '../../components/FormElement/FormElement';
import { register } from '../../utils/api';

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
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // handlers
  const onRegistration = () => {
    setIsLoading(true);
    register({ email, password, name })
      .then((res) => res.success && navigate('/login'))
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="main">
      <FormElement
        title="Регистрация"
        submitText="Зарегистрироваться"
        additionalActions={additionalActions}
        onSubmit={onRegistration}
        isActive={password !== '' && email !== '' && name !== ''}
        isLoading={isLoading}
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
          autoComplete="on"
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
