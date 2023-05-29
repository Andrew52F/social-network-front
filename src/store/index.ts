import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import uiStateReducer from './uiStateSlice';
import userProfileReducer from './userProfileSlice';
import postsReducer from './postsSlice';
import modalsReducer from './modalsSlice';



const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  userProfile: userProfileReducer,
  uiState: uiStateReducer,
  posts: postsReducer,
  modals: modalsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  
});

export const setupStore = () => store

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];