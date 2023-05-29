import { RootState } from './index';
import { UserSmall } from '../models/UserSmall';
import { IPost } from '../models/IPost';
import { createSlice, PayloadAction, createEntityAdapter, EntityState, createSelector } from '@reduxjs/toolkit';
import { loginAction, createProfileAction, checkAuth, createPostAction, getUsersPostsAction } from './asyncActionCreators';






  interface sliceData {
    state: string | null;
    data: null | {
      id: string;
    }
  }

  const initialState: sliceData = {
   state: null,
   data: null,
  }

const modalsSlice = createSlice({
  name: 'modals',
  initialState: initialState,
  reducers: {
    closeModal(state) {
      state.state = null;
      state.data = null;
    },
    showPost(state, {payload}: PayloadAction<string>) {
      if (payload ) {
        state.state = 'post';
        state.data = {
          id: payload
        }
      }

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersPostsAction.fulfilled, (state, { payload } : PayloadAction) => {
       
      })


      
      
  },

});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
