import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { loginAction, registrationAction } from '../../store/asyncActionCreators';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch();
  const onLogin = () => {
    console.log('login data: ', email, password)
    dispatch(loginAction({email, password}))
  }
  const onRegistration = () => {
    console.log('registration data: ', email, password)
    dispatch(registrationAction({email, password}))
  }

  return (
    <div>
      <input
        type="text"
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={onLogin}>
        Login
      </button>
      <button onClick={onRegistration}>
        Registration
      </button>
    </div>
  )
}

export default LoginForm;