import { RootState } from './index';
import { UserSmall } from './../models/UserSmall';
import { createSlice, PayloadAction, createEntityAdapter, EntityState, createSelector } from '@reduxjs/toolkit';
import { loginAction, createProfileAction, checkAuth, removeFriendAction } from './asyncActionCreators';

type Notification = {
  id: string,
  userId: string,
  sender?: {
    username: string,
    image: string,
    id: string,
  },
  type: 'invite' | 'notice',
  data: {
    where?: string,
    text: string,
    code: string,
  }
  date: string,
}

const friendsAdapter = createEntityAdapter<UserSmall>();
const notificationsAdapter = createEntityAdapter<Notification>();



interface UserState {
  isProfileCreated: boolean;
  id?: string;
  username?: string;
  image?: string;
  friends: EntityState<UserSmall>;
  notifications: EntityState<Notification>;
}

const initialState: UserState = {
  isProfileCreated: false, 
  friends: friendsAdapter.getInitialState(),
  notifications: notificationsAdapter.getInitialState(),
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setIsUserCreated(state, {payload}:{type: string, payload: boolean}) {
      state.isProfileCreated = payload;
    },

    //notifications
    getNotifications(state, {payload}) {
      notificationsAdapter.addMany(state.notifications, payload);
    },
    addNotification(state, { payload}) {
      notificationsAdapter.addOne(state.notifications, payload);
    },
    removeNotification(state, {payload}) {
      notificationsAdapter.removeOne(state.notifications, payload);
    },

    //friends
    getFriends(state, {payload}) {
      friendsAdapter.addMany(state.friends, payload);
    },
    addFriend(state, { payload}) {
      friendsAdapter.addOne(state.friends, payload);
    },
    removeFriend(state, {payload}) {
      friendsAdapter.removeOne(state.friends, payload);
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        if (payload.user?.username) {
          state.id = payload.user.id;
          state.username = payload.user?.username;
          state.image = payload.user?.image;
          state.isProfileCreated = true;
          if (payload.friends) {
            friendsAdapter.addMany(state.friends, payload.friends);
          }
        }
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        if (payload.user?.username) {
          state.id = payload.user.id;
          state.username = payload.user?.username;
          state.image = payload.user?.image;
          state.isProfileCreated = true;
          if (payload.friends) {
            friendsAdapter.addMany(state.friends, payload.friends);
          }
        }
      })
      .addCase(createProfileAction.fulfilled, (state, { payload }) => {
        if (payload.username) {
          state.id = payload.id;
          state.username = payload.username;
          state.image = payload.image;
          state.isProfileCreated = true;
          if (payload.friends) {
            friendsAdapter.addMany(state.friends, payload.friends);
          }
        }
      })
      .addCase(removeFriendAction.fulfilled, (state, { payload }) => {
        if (payload.user) {
          friendsAdapter.removeOne(state.friends, payload.user.id);
        }
      })
  },

});


export const { actions } = profileSlice;
export const friendsSelectors = friendsAdapter.getSelectors<RootState>(state => state.profile.friends);
export const notificationsSelectors = notificationsAdapter.getSelectors<RootState>(state => state.profile.notifications);

export const sortedNotificationsSelector = createSelector(
  (state: RootState) => notificationsSelectors.selectAll(state),
  (notifications) => {
    return notifications.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
);

export default profileSlice.reducer;
