import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import * as API from "./../../api";

const initialState = {
  // posts: [
  //   {
  //     userId: 1,
  //     id: 1,
  //     title:
  //       "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //     body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  //   },
  //   {
  //     userId: 1,
  //     id: 2,
  //     title: "qui est esse",
  //     body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  //   },
  // ],
  posts: [],
  isFetching: false,
  error: null,
};

// const httpClient = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com",
// });

// action creator
export const getPostsThunk = createAsyncThunk(
  "posts/getPosts",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await httpClient.get("/posts");
      const { data } = await API.getPosts();
      return data; // data => payload in 'posts/getPosts/fulfilled'
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // err => payload in 'posts/getPosts/rejected'
    }
  }
);
// console.dir(getPostsThunk);
// pending: isFetching = true, error = null,
// fulfilled: isFetching = false, posts = data
// rejected: isFetching = false, error = err

const postsSlice = createSlice({
  initialState,
  name: "posts",
  // (state,action)=>{}
  reducers: {},
  extraReducers: (builder) => {
    // 'posts/getPosts/pending'
    // builder.addCase(getPostsThunk.pending, (state, { payload }) => {
    builder.addCase(getPostsThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    // 'posts/getPosts/fulfilled'
    builder.addCase(getPostsThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.posts = payload;
    });
    // 'posts/getPosts/rejected'
    builder.addCase(getPostsThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = postsSlice;

export default reducer;
