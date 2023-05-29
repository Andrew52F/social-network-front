import { createSlice, PayloadAction, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { getUserProfileAction, getUserFriendsAction } from './asyncActionCreators';
import { UserSmall } from '../models/UserSmall';
import { RootState } from './index';

import { IProfile } from '../models/IProfile';


const postsAdapter = createEntityAdapter();
const friendsAdapter = createEntityAdapter<UserSmall>();
const pagesAdapter = createEntityAdapter();
const usersAdapter = createEntityAdapter();
const commentsAdapter = createEntityAdapter();

interface sliceData {
  profile: IProfile,
  friends: EntityState<any>,
  pages: EntityState<any>,
}

  const initialState: sliceData = {
    profile: {
      id: '',
      username: '',
      name: '',
      surname: '',
      isMale: true,
    },
    friends: friendsAdapter.getInitialState(),
    pages: pagesAdapter.getInitialState(),
  }

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileAction.fulfilled, (state, { payload }: PayloadAction<IProfile>) => {
        state.profile.image = payload.image || undefined;
        
        state.profile.id = payload.id || undefined;
        state.profile.username = payload.username;
        state.profile.name = payload.name;
        state.profile.surname = payload.surname
        state.profile.birthDate = payload.birthDate;
        
      })
      .addCase(getUserFriendsAction.fulfilled, (state, { payload }: PayloadAction<UserSmall[]>) => {
        if (payload) {
          friendsAdapter.removeAll(state.friends);
          friendsAdapter.addMany(state.friends, payload)
        }
      })
      
  },

});


export const { actions } = userProfileSlice;
export const userFriendsSelectors = friendsAdapter.getSelectors<RootState>((state) => state.userProfile.friends);
export default userProfileSlice.reducer;
