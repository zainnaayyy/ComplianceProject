import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'
import { url } from "@/shared";

export const getRoles = createAsyncThunk(
  "Roles",
  async (token, { dispatch, getState }) => {
    dispatch(gettingRoleListLoading());
    fetch(`${url}/getAllRoles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch(gettingRoleListSuccess(result.roles)))
      .catch((error) => dispatch(gettingRoleListFailed(error)));
    // await axios
    // .get(`${url}/`)
    // .then((response) => dispatch(gettingRoleListSuccess(response.data)))
    // .catch((error) => dispatch(gettingRoleListFailed(error)));
  }
);

const RoleData = createSlice({
  name: "Roles",
  initialState: {
    Roles: [],
    RolesLoading: false,
    RolesError: false,
    RolesErrorMessage: "",
    status: "idle",
  },
  reducers: {
    gettingRoleListLoading: (state, action) => {
      state.Roles = null;
      state.RolesLoading = true;
      state.RolesError = false;
      state.RolesErrorMessage = null;
      state.status = "loading";
    },
    gettingRoleListSuccess: (state, action) => {
      state.Roles = action.payload;
      state.RolesLoading = false;
      state.RolesError = false;
      state.RolesErrorMessage = null;
      state.status = "success";
    },
    gettingRoleListFailed: (state, action) => {
      state.Roles = null;
      state.RolesLoading = false;
      state.RolesError = true;
      state.RolesErrorMessage = action.payload;
      state.status = "error";
    },
    gettingRoleListClear: (state, action) => {
      state.Roles = null;
      state.RolesLoading = false;
      state.RolesError = false;
      state.RolesErrorMessage = null;
      state.status = "idle";
    },
  },
});

export const {
  gettingRoleListClear,
  gettingRoleListLoading,
  gettingRoleListSuccess,
  gettingRoleListFailed,
} = RoleData.actions;
export default RoleData.reducer;
