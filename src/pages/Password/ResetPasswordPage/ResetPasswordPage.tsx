import React, { useState } from 'react';

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import FormElement from '../../../components/FormElement/FormElement';
import { additionalActions, resetRequest } from '../index';

function ResetPasswordPage() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  //

  return (
    <main className="main">
      <FormElement
        title="Восстановление пароля"
        submitText="Сохранить"
        additionalActions={additionalActions}
        onSubmit={resetRequest}
        isActive={password !== '' || code !== ''}
        isLoading={false}
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
