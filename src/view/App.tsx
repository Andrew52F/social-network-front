import React, { FC, useEffect, useState, memo, useMemo } from 'react';
import { useAppSelector } from '../hooks/redux';
import { checkAuth } from '../store/asyncActionCreators';
import { useAppDispatch } from '../hooks/redux';

import { Routes, Route, Navigate, useNavigate, BrowserRouter, useLocation, matchRoutes, Location, Outlet}  from "react-router-dom";

import MainContainer from './components/main/MainContainer';

import AuthPage from './pages/AuthPage';
import UserPage from './pages/UserPage';

import Login from './components/auth/scense/Login';
import Registration from './components/auth/scense/Registration';
import LoginForm from './components/LoginForm';
import AuthSwitch from './components/auth/UI/AuthSwitch';
import Profile from './pages/CreateProfilePage';

import Navbar from './components/main/Navbar';
import NotificationsPage from './pages/NotificationsPage';
import SocketApiProvider from '../hooks/useSocket';
import initSocket from '../websocket';


interface Props {
  children: React.ReactElement;
  isAuthorized?: boolean;
  hasProfileCreated?: boolean;
}

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, authUser, isLoading } = useAppSelector(state => state.auth)
  const { isProfileCreated, id, username } = useAppSelector(state => state.profile)
  const currentLocation = useLocation();

  const socketApi = useMemo(() => {
    if (!id) {
      return null;
    }
    return initSocket(id);
  }, [id])

  const routesWithNav = [
    {path: '/feed'},
    {path: '/messages'},
    {path: 'people'},
    {path: '/profile/:username'},
    {path: '/'},
    {path: '/notifications'}
  ]

  const matches = matchRoutes(routesWithNav, currentLocation);

  const ProtectedRoute:FC<Props> = ({ isAuthorized = false, hasProfileCreated = false, children }) => {
    if (!isLoading) {
      if (isAuthorized) {
        if((!isAuth || !authUser?.isActivated) ) {
          console.log('IS NOT AUTH: ', isAuth)
          return <Navigate to='/login' />
        }
      }
      if (hasProfileCreated) {
        if (!isProfileCreated) {
          console.log('PROFILE IS NOT CREATED: ', isProfileCreated)
          return <Navigate to='/create-profile' />
        }
      }
    }
    return children
  };

  useEffect( () => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('refresh')
      dispatch(checkAuth())
    }
    if (token === null) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if(socketApi && id) {
      socketApi.getNotifications(id)
    }
  }, [id, socketApi])
  
  useEffect(() => {
    if(socketApi && username) {
      socketApi.getFriends(username)
    }
  }, [username, socketApi])

  



  return (
    <>
      {matches?.length && (<Navbar />)}
      
      <div className='h-full overflow-y-scroll min-h-full'> 
        <Routes>
          <Route 
          path={'/'}
            element={
              <ProtectedRoute
                isAuthorized={true}
                hasProfileCreated={true}
              >
                {socketApi ? (
                  <SocketApiProvider socket={socketApi} >
                    <MainContainer>
                      <Outlet />
                    </MainContainer>
                  </SocketApiProvider>
                ) : <></>}

              </ProtectedRoute>
            }
          >
            <Route path={'/notifications'} element={<NotificationsPage />} />
            <Route path={'/feed'} element={<p>Posts Feed</p>} />
            <Route path={'/messages'} element={<p>Messages</p>} />
            <Route path={'/people'} element={<p>People</p>} />
            <Route path={'/profile/:username'} element={<UserPage />} />
          </Route>

          <Route element={<AuthPage />}>
            <Route path={'/login'} element={<><AuthSwitch /><Login /></>} />
            <Route path={'/registration'} element={<><AuthSwitch /><Registration /></>} />
            <Route path={'/auth'} element={<LoginForm />} />
          </Route>

          <Route path={'/create-profile'} element={
              <ProtectedRoute
                isAuthorized={true}
              >
                <Profile />
              </ProtectedRoute>
            } />
        </Routes>
      </div>
      {/* <SettingsMenu isOpen={true} noLogout={true} invertedTextColor={true} /> */}
    </>
  )
}

export default App;
