
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

const API_URL = 'http://localhost:5000';

interface loginArguments {
  email: string;
  password: string;
}

export const loginAction = createAsyncThunk('auth/login', async ({email, password}: loginArguments , thunkApi) => {
  try {
    console.log('loginAction ', email, password)
    const response =  await AuthService.login(email, password);
    console.log('async action response: ', response);
    localStorage.setItem('token', response.data.accessToken);

    return response.data;
  }
  catch (error) {
    console.log('fetch error ', error)
    return thunkApi.rejectWithValue('Login request is failed');
  }

})

export const registrationAction = createAsyncThunk('auth/registration', async ({email, password}: loginArguments , thunkApi) => {
  try {
    console.log('regisrtationAction ', email, password)
    const response =  await AuthService.registration(email, password);
    console.log('async action response: ', response);
    localStorage.setItem('token', response.data.accessToken);

    return response.data;
  }
  catch (error) {
    console.log('fetch error ', error)
    return thunkApi.rejectWithValue('Registration request is failed');
  }

})

export const logoutAction = createAsyncThunk('auth/logout', async ( _ , thunkApi) => {
  try {
    console.log('logoutAction ')
    const response = await AuthService.logout();
    console.log('async action response: ', response);
    localStorage.removeItem('token');
    return;
  }
  catch (error) {
    console.log('fetch error ', error)
    return thunkApi.rejectWithValue('Logout request is failed');
  }

})

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_ , thunkApi) => {
  try {
    console.log('checkAuth')
    // $api.post<AuthResponse>('/auth/registration', {email, password})
    const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});
    console.log('async action response: ', response);
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  }
  catch (error) {
    console.log('check auth error: ', error);
    return thunkApi.rejectWithValue(' Check request is failed');
  }
})

