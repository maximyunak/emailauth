import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/response/IUser';
import UserServise from './services/UserServise';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) store.checkAuth();
  }, []);

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  async function getUsers() {
    try {
      const res = await UserServise.fetchUsers();
      setUsers(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>{store.isAuth ? `авторивован ${store.user.email}` : 'nook'}</h1>
      <h1>{store.user.isActivated ? 'акк подтвержден' : 'подтвердите акк'}</h1>
      <button onClick={() => store.logout()}>logout</button>
      <div>
        <button onClick={getUsers}>get users</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App);
