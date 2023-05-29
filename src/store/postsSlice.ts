import { RootState } from './index';
import { UserSmall } from './../models/UserSmall';
import { IPost } from './../models/IPost';
import { createSlice, PayloadAction, createEntityAdapter, EntityState, createSelector } from '@reduxjs/toolkit';
import { loginAction, createProfileAction, checkAuth, createPostAction, updatePostAction, removePostAction, getUsersPostsAction } from './asyncActionCreators';

type UsersPosts = {
  related: string,
  posts: IPost[],
  user: UserSmall,
}
type CreatePost = {
  related: string,
  post: IPost,
  user: UserSmall,
}

const postsAdapter = createEntityAdapter<IPost>();
const usersAdapter = createEntityAdapter<UserSmall>();
const commentsAdapter = createEntityAdapter();

interface sliceData {
  related: string,
  activePostId?: string,
  postFormPostId: string | null,
  comments: EntityState<any>,
  posts: EntityState<IPost>,
  users: EntityState<UserSmall>,
}

  const initialState: sliceData = {
    related: '',
    postFormPostId: null,
    posts: postsAdapter.getInitialState(),
    comments: commentsAdapter.getInitialState(),
    users: usersAdapter.getInitialState(),
  }


const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setActivePost(state, {payload}: PayloadAction<string>) {
      if (state.activePostId === payload) {
        delete state.activePostId;
        return;
      }
      state.activePostId = payload;
    },
    setPostFormPostId(state, {payload}: PayloadAction<string | null>) {
      state.postFormPostId = payload;
    },
    updatePost(state, {payload}:PayloadAction<IPost>){
      console.log('PAYLOAD: ', payload);
      if ( payload.id) {

        postsAdapter.updateOne(state.posts, {id: payload.id, changes: payload})
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersPostsAction.fulfilled, (state, { payload } : PayloadAction<UsersPosts>) => {
        if (state.related !== payload.related) {
          postsAdapter.removeAll(state.posts);
          usersAdapter.removeAll(state.users);
          state.related = payload.related;
        }
        postsAdapter.addMany(state.posts, payload.posts);
        usersAdapter.addOne(state.users, payload.user);
      })
      .addCase(createPostAction.fulfilled, (state, { payload } : PayloadAction<CreatePost>) => {
        console.log('CREATE POST RESPONSE ', payload)
        postsAdapter.addOne(state.posts, payload.post);
        usersAdapter.addOne(state.users, payload.user);
      })
      .addCase(updatePostAction.fulfilled, (state, { payload } : PayloadAction<IPost>) => {
        console.log('UPDATE POST RESPONSE ', payload)
        postsAdapter.updateOne(state.posts, {id: payload.id, changes: payload})
        state.postFormPostId = null;
        // postsAdapter.addOne(state.posts, payload.post);
        // usersAdapter.addOne(state.users, payload.user);
      })
      .addCase(removePostAction.fulfilled, (state, {payload}: PayloadAction<string>) => {
        // commentsAdapter.removeMany(state.posts, )
        postsAdapter.removeOne(state.posts, payload);
      })

      
      
  },

});
export const usersSelectors = usersAdapter.getSelectors<RootState>(state => state.posts.users);
export const postsSelectors = postsAdapter.getSelectors<RootState>(state => state.posts.posts);

export const sortedPostsSelector = createSelector(
  (state: RootState) => postsSelectors.selectAll(state),
  (posts) => {
    return posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
);

export const postsIds = createSelector(
  (state: RootState) => postsSelectors.selectAll(state),
  (posts) => {
    return posts.map(post => post.id);
  }
);


export const { actions } = postsSlice;
export default postsSlice.reducer;
