import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { loginAction, registrationAction, logoutAction, checkAuth } from './asyncActionCreators';

interface UserState {
  authUser: null | IUser;
  isAuth: boolean;
  status: null | string;
  error: null | string | any;
}

//example with action.payload typification
// someReducer(state, action: PayloadAction<num>) {

// }

const initialState: UserState = {
  authUser: null,
  isAuth: false,
  status: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    someReducer(state, {payload}) {

    }
  },
  extraReducers: (builder) => {
    builder
      //login actions
      .addCase(loginAction.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        const { user } = payload;

        state.status = 'idle';
        state.authUser = user;
        state.isAuth = true;
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('rejected login payload: ', payload);
        state.isAuth = false;
        state.error = payload;
      })
      //registration actions
      .addCase(registrationAction.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(registrationAction.fulfilled, (state, { payload }) => {
        const { user } = payload;

        state.status = 'idle';
        state.authUser = user;
        state.isAuth = true;
      })
      .addCase(registrationAction.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('rejected login payload: ', payload);
        state.isAuth = false;
        state.error = payload;
      })
      //logout actions
      .addCase(logoutAction.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.status = null;
        state.isAuth = false;
      })
      .addCase(logoutAction.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('rejected login payload: ', payload);
        state.isAuth = false;
        state.error = payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        const user = payload?.user;

        state.status = 'idle';
        state.authUser = user || null;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('rejected login payload: ', payload);
        state.isAuth = false;
        state.error = payload;
      })
  },

});


export const { actions } = authSlice;
export default authSlice.reducer;
