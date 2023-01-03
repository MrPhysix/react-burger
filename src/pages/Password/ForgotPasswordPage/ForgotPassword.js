import React, { useState, useEffect } from 'react';

import {
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useNavigate } from 'react-router-dom';
import FormElement from '../../../components/FormElement/FormElement';
import additionalActions from '../index';
import { forgotPassword } from '../../../utils/api/password';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // effects
  useEffect(() => () => {
    console.log('email', email);
  }, [email]);

  // handlers
  const onForgotPassword = () => {
    forgotPassword(email)
      .then((res) => {
        console.log('onReset', res);
        return res;
      })
      .then((res) => res.success && navigate('/reset-password'));
  };

  return (
    <main className="main">
      <FormElement
        title="Восстановление пароля"
        submitText="Восстановить"
        additionalActions={additionalActions}
        onSubmit={onForgotPassword}
        isActive={email !== ''}
      >
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          placeholder="E-mail"
        />
      </FormElement>
    </main>
  );
}

export default ForgotPassword;
