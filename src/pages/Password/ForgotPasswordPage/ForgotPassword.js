import React, { useState } from 'react';

import {
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useNavigate } from 'react-router-dom';
import FormElement from '../../../components/FormElement/FormElement';
import { additionalActions, forgotRequest } from '../index';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  // handlers
  const onSubmit = () => forgotRequest().then((res) => res && navigate('/reset-password'));

  return (
    <main className="main">
      <FormElement
        title="Восстановление пароля"
        submitText="Восстановить"
        additionalActions={additionalActions}
        onSubmit={onSubmit}
        isActive={email !== ''}
        isLoading={false}
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
