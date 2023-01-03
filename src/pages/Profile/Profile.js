import React, { useState } from 'react';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import FormElement from '../../components/FormElement/FormElement';

import style from './profile.module.css';
import ProfileNav from './ProfileNav/ProfileNav';

function Profile() {
  const [name, setName] = useState({ name: 'Бобик', inputActive: false });
  const [email, setEmail] = useState('bob@example.com');
  const [password, setPassword] = useState('bob@example.com');

  // handlers

  const nameHandler = () => setName({ ...name, inputActive: !name?.inputActive });

  return (
    <main className={`main ${style.profile}`}>
      <ProfileNav />
      <FormElement profile>
        <Input
          onChange={(e) => setName({ ...name, name: e.target.value })}
          value={name?.name}
          name="name"
          type="text"
          placeholder="Имя"
          icon="EditIcon"
          disabled={!name.inputActive}
          onIconClick={nameHandler}
          onBlur={nameHandler}
        />
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          placeholder="Логин"
          isIcon
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          icon="EditIcon"
          noValidate
        />
      </FormElement>
    </main>
  );
}

export default Profile;
