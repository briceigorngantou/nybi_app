/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state: any) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state: any, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        // eslint-disable-next-line no-console
        console.error('user friend non-existent :(');
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state: any, action) => {
      const updatedPost = state.posts.map((post: any) => {
        if (post.id === action.payload.post.id) return action.payload.post;
        return post;
      });
      state.posts = updatedPost;
    }
  }
});

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts } =
  authSlice.actions;
export default authSlice.reducer;
