import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'
import { url } from "@/shared";

export const getUsers = createAsyncThunk(
  "users",
  async (token, { dispatch, getState }) => {
    dispatch(gettingUserListLoading());
    fetch(`${url}/getAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch(gettingUserListSuccess(result.users)))
      .catch((error) => dispatch(gettingUserListFailed(error)));
    // await axios
    // .get(`${url}/`)
    // .then((response) => dispatch(gettingUserListSuccess(response.data)))
    // .catch((error) => dispatch(gettingUserListFailed(error)));
  }
);

const userData = createSlice({
  name: "users",
  initialState: {
    users: [],
    usersLoading: false,
    usersError: false,
    usersErrorMessage: "",
    status: "idle",
  },
  reducers: {
    gettingUserListLoading: (state, action) => {
      state.users = null;
      state.usersLoading = true;
      state.usersError = false;
      state.usersErrorMessage = null;
      state.status = "loading";
    },
    gettingUserListSuccess: (state, action) => {
      state.users = action.payload;
      state.usersLoading = false;
      state.usersError = false;
      state.usersErrorMessage = null;
      state.status = "success";
    },
    gettingUserListFailed: (state, action) => {
      state.users = null;
      state.usersLoading = false;
      state.usersError = true;
      state.usersErrorMessage = action.payload;
      state.status = "error";
    },
    gettingUserListClear: (state, action) => {
      state.users = null;
      state.usersLoading = false;
      state.usersError = false;
      state.usersErrorMessage = null;
      state.status = "idle";
    },
  },
});

export const {
  gettingUserListClear,
  gettingUserListLoading,
  gettingUserListSuccess,
  gettingUserListFailed,
} = userData.actions;
export default userData.reducer;
