import React, { useState, useEffect } from 'react';

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useNavigate } from 'react-router-dom';
import FormElement from '../../../components/FormElement/FormElement';
import additionalActions from '../index';
import { resetPassword } from '../../../utils/api/password';

function ResetPasswordPage() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => () => {
    console.log('code', code);
    console.log('password', password);
  }, [code, password]);

  // handlers
  const onResetPassword = () => {
    resetPassword(password, code)
      .then((res) => {
        console.log('onReset', res);
        return res;
      })
      .then((res) => res.success && navigate('/'));
  };

  return (
    <main className="main">
      <FormElement
        title="Восстановление пароля"
        submitText="Сохранить"
        additionalActions={additionalActions}
        onSubmit={onResetPassword}
        isActive={password !== '' || code !== ''}
      >
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          autoComplete="on"
          placeholder="Введите новый пароль"
        />
        <Input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          name="code"
          placeholder="Введите код из письма"
        />
      </FormElement>
    </main>
  );
}

export default ResetPasswordPage;
