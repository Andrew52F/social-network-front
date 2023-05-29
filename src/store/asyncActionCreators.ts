import { IProfile } from '../models/IProfile';

import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import PostService, { postRaw} from '../services/PostService';

import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import FriendService from '../services/FriendService';

const API_URL = 'http://localhost:5000';

interface loginArguments {
  email: string;
  password: string;
}
export type RequestError = {
  status: number,
  message: string,
  errors: any[]
}


export const loginAction = createAsyncThunk('auth/login', async ({email, password}: loginArguments , thunkApi) => {
  try {
    console.log('loginAction ', email, password)
    const response =  await AuthService.login(email, password);
    console.log('async action response: ', response);
    localStorage.setItem('token', response.data.accessToken);

    return response.data;
  }
  catch (error : any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('login error ', newError)
    return thunkApi.rejectWithValue(newError);
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
  catch (error : any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('registration error ', newError)
    return thunkApi.rejectWithValue(newError);
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
  catch (error : any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('logout error ', newError)
    return thunkApi.rejectWithValue(newError);
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
  catch (error : any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('check error ', newError)
    return thunkApi.rejectWithValue(newError);
  }
})




/// Our

export const createProfileAction = createAsyncThunk('auth/profile', async (values: IProfile , thunkApi) => {
  try {
    console.log('profileCreateAction ');
    const response =  await UserService.createProfile(values);
    console.log('async action response: ', response);
    // localStorage.setItem('token', response.data.accessToken);

    return response.data;
  }
  catch (error : any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('Crete profile error ', newError)
    return thunkApi.rejectWithValue(newError);
  }

})

/// UserPage data

export const getUserProfileAction = createAsyncThunk('user/getProfile', async (username: string , thunkApi) => {
  try {
    console.log('getProfileAction ');
    const response =  await UserService.getUserProfile(username);
    console.log('async action response: ', response);
    // localStorage.setItem('token', response.data.accessToken);

    return response.data;
  }
  catch (error : any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('Get user profile error ', newError)
    return thunkApi.rejectWithValue(newError);
  }

})

export const getUserFriendsAction = createAsyncThunk('user/friends/get', async (username: string , thunkApi) => { // users we added to friends
  try {
    console.log('getUserFriendsAction ');
    const response = await FriendService.getUserFriends(username)
    console.log('async action response: ', response);
    return response.data;
  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('error', newError)
    return thunkApi.rejectWithValue(newError);
  }
})
// Friends
export const inviteFriendAction = createAsyncThunk('user/friends/invite', async (userId: string , thunkApi) => {
  try {
    console.log('inviteFriendAction ');
    const response = await FriendService.inviteFriend(userId)
    console.log('async action response: ', response);
    return response.data;
  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('error', newError)
    return thunkApi.rejectWithValue(newError);
  }
})
export const acceptFriendAction = createAsyncThunk('user/friends/accept', async ({userId, notificationId}: {userId: string, notificationId: string} , thunkApi) => { // N
  try {
    console.log('acceptFriendAction ');
    const response = await FriendService.acceptFriend(userId, notificationId)
    console.log('async action response: ', response);
    return response.data;
  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('error', newError)
    return thunkApi.rejectWithValue(newError);
  }
})
export const declineFriendAction = createAsyncThunk('user/friends/decline', async ({userId, notificationId}: {userId: string, notificationId: string} , thunkApi) => { // N
  try {
    console.log('declineFriendAction ');
    console.log('notificationId: ', notificationId)
    const response = await FriendService.declineFriend(userId, notificationId)
    console.log('async action response: ', response);
    return response.data;
  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('error', newError)
    return thunkApi.rejectWithValue(newError);
  }
})
export const removeFriendAction = createAsyncThunk('user/friends/remove', async (userId: string , thunkApi) => { // N
  try {
    console.log('removeFriendAction ');
    const response = await FriendService.removeFriend(userId)
    console.log('async action response: ', response);
    return response.data;
  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('error', newError)
    return thunkApi.rejectWithValue(newError);
  }
})

// Posts
export const createPostAction = createAsyncThunk('post/create', async (data: postRaw, thunkApi) => {
  try {
    console.log('createPostAction');
    const response = await PostService.create(data);
    console.log('async action response: ', response);
    return response.data;
    
  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('error', newError)
    return thunkApi.rejectWithValue(newError);
  }
})

export const updatePostAction = createAsyncThunk('post/update', async (data: {postId: string, data: postRaw}, thunkApi) => {
  try {
    console.log('updatePostAction');
    const response = await PostService.update(data);
    console.log('async action response: ', response);
    return response.data;
    
  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('error', newError)
    return thunkApi.rejectWithValue(newError);
  }
})

export const removePostAction = createAsyncThunk('post/remove', async (postId: string, thunkApi) => {
  try {
    console.log('deletePostAction');
    const response = await PostService.remove(postId);
    console.log('async action response: ', response);
    return response.data;
    
  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('error', newError)
    return thunkApi.rejectWithValue(newError);
  }
})

export const getUsersPostsAction = createAsyncThunk('post/getUsers', async ({username, dozen}: {username: string, dozen: number}, thunkApi) => {
  try {
    console.log('getUsersPostsAction');
    const response = await PostService.getUsersPosts(username, dozen)
    console.log('POSTS async action response: ', response)

    response.data.related = username;

    return response.data;

  }
  catch (error: any) {
    const newError: RequestError = {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.errors,
    }
    console.log('POSTS error', newError)
    return thunkApi.rejectWithValue(newError);
  }
  
})


// export const getUserPagesAction = createAsyncThunk('user/pages', async (username: string , thunkApi) => { // pages we added to followed pages
//   try {
//     console.log('getUserPagesAction ');
//     const response = await UserService.getUserPages(username)
//     console.log('async action response: ', response);
//     return response.data;
//   }
//   catch (error: any) {
//     const newError: RequestError = {
//       status: error.response.status,
//       message: error.response.data.message,
//       errors: error.response.data.errors,
//     }
//     console.log('Get user pages error ', newError)
//     return thunkApi.rejectWithValue(newError);
//   }
// })
// export const getUserPersecutedUsersAction = createAsyncThunk('user/persecutedUsers', async (username: string , thunkApi) => { // users we pressed follow
//   try {
//     console.log('getUserPersecutedUsersAction ');
//     const response = await UserService.getUserPersecutedUsers(username)
//     console.log('async action response: ', response);
//     return response.data;
//   }
//   catch (error: any) {
//     const newError: RequestError = {
//       status: error.response.status,
//       message: error.response.data.message,
//       errors: error.response.data.errors,
//     }
//     console.log('Get user persecuted users error ', newError)
//     return thunkApi.rejectWithValue(newError);
//   }
// })