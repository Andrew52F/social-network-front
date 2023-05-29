import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from '../models/AuthUser';
import { loginAction, registrationAction, logoutAction, checkAuth, RequestError } from './asyncActionCreators';

interface AuthState {
  authUser: null | AuthUser;
  isUserCreated?: boolean;
  isLoading: boolean;
  isAuth: boolean;
  error: any;
}

const initialState: AuthState = {
  authUser: null,
  isLoading: true,
  isAuth: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsUserCreated(state, {payload}:{type: string, payload: boolean}) {
      
    }
  },
  extraReducers: (builder) => {
    builder
      //login actions
      .addCase(loginAction.pending, (state) => {
        
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        const { authUser } = payload;
        
        state.isLoading = false;
        state.authUser = authUser;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, { payload}) => {
        state.isLoading = false;
        // console.log('rejected login payload: ', payload);
        state.isAuth = false;
        state.error = payload;
      })
      //registration actions
      .addCase(registrationAction.pending, (state) => {
        // state.status = 'pending';
      })
      .addCase(registrationAction.fulfilled, (state, { payload }) => {
        const { authUser } = payload;

        state.isLoading = false;
        state.authUser = authUser;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(registrationAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        // console.log('rejected login payload: ', payload);
        state.isAuth = false;
        state.error = payload;
      })
      //logout actions
      .addCase(logoutAction.pending, (state) => {
        // state.status = 'pending';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = null;
      })
      .addCase(logoutAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        // console.log('rejected login payload: ', payload);
        state.isAuth = false;
        state.error = payload;
      })
      //checkAuth actions
      .addCase(checkAuth.pending, (state) => {
        // state.status = 'pending';
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        const authUser = payload?.authUser;

        state.isLoading = false;
        state.authUser = authUser || null;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        // console.log('rejected login payload: ', payload);
        state.isAuth = false;
        state.error = payload;
      })
  },

});


export const { actions } = authSlice;
export default authSlice.reducer;
