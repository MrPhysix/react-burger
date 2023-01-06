import React, { useState } from 'react';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import FormElement from '../../components/FormElement/FormElement';

import style from './profile.module.css';
import ProfileNav from './ProfileNav/ProfileNav';
import { useAuth } from '../../utils/api/auth';

function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState({ name: user.name, inputActive: false });
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user?.password);

  // handlers
  const editUser = () => {
    updateUser({ name: name.name, email });
  };

  const nameHandler = () => {
    setName({ ...name, inputActive: !name?.inputActive });
    editUser();
  };

  return (
    <main className={`main ${style.profile}`}>
      <ProfileNav />
      <div className={style.element}>
        <FormElement profile isActive>
          <Input
            onChange={(e) => setName({ ...name, name: e.target.value })}
            value={name?.name || ''}
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
            value={email || ''}
            name="email"
            type="email"
            placeholder="Логин"
            onBlur={editUser}
            isIcon
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password || '******'}
            name="password"
            icon="EditIcon"
            autoComplete="off"
            noValidate
          />
        </FormElement>
      </div>
    </main>
  );
}

export default Profile;
