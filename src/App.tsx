import React, { FC, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { useAppSelector } from './hooks/redux';
import { checkAuth, logoutAction } from './store/asyncActionCreators';
import { useAppDispatch } from './hooks/redux';
import { IUser } from './models/IUser';
import AuthUserService from './services/AuthUserService';



const App: FC = () => {
  const { isAuth, authUser, status } = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    try {
      const response = await AuthUserService.fetchUsers();
      setUsers(response.data);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect( () => {
    if (localStorage.getItem('token')) {
      console.log('refresh')
      dispatch(checkAuth())
    }
  }, [])

  if (status === ('loading')) {
      return (
        <h1>Loading...</h1>
      )
  }
  if (!isAuth) {
    return (
      <>
        <h1>AUTHORIZE!!!!</h1>
        <LoginForm />
        <button onClick={getUsers}>Get users</button>
        {users.map(user => (
          <div key={user.email}>{user.email}</div>
        ))}
      </>
    )
  }
  return (
    <div>
      <h1>{isAuth ? `User is authorized ${authUser?.email}` : 'AUTHORIZE!!!!'}</h1>
      <button onClick={() => dispatch(logoutAction())}>Logout</button>
      <button onClick={getUsers}>Get users</button>
      {users.map(user => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default App;
