import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'
import { url } from "@/shared";

export const getSites = createAsyncThunk(
  "sites",
  async (token, { dispatch, getState }) => {
    dispatch(gettingSiteListLoading());
    fetch(`${url}/getAllSites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch(gettingSiteListSuccess(result.sites)))
      .catch((error) => dispatch(gettingSiteListFailed(error)));
    // await axios
    // .get(`${url}/`)
    // .then((response) => dispatch(gettingSiteListSuccess(response.data)))
    // .catch((error) => dispatch(gettingSiteListFailed(error)));
  }
);

const siteData = createSlice({
  name: "sites",
  initialState: {
    sites: [],
    sitesLoading: false,
    sitesError: false,
    sitesErrorMessage: "",
    status: "idle",
  },
  reducers: {
    gettingSiteListLoading: (state, action) => {
      state.sites = null;
      state.sitesLoading = true;
      state.sitesError = false;
      state.sitesErrorMessage = null;
      state.status = "loading";
    },
    gettingSiteListSuccess: (state, action) => {
      state.sites = action.payload;
      state.sitesLoading = false;
      state.sitesError = false;
      state.sitesErrorMessage = null;
      state.status = "success";
    },
    gettingSiteListFailed: (state, action) => {
      state.sites = null;
      state.sitesLoading = false;
      state.sitesError = true;
      state.sitesErrorMessage = action.payload;
      state.status = "error";
    },
    gettingSiteListClear: (state, action) => {
      state.sites = null;
      state.sitesLoading = false;
      state.sitesError = false;
      state.sitesErrorMessage = null;
      state.status = "idle";
    },
  },
});

export const {
  gettingSiteListClear,
  gettingSiteListLoading,
  gettingSiteListSuccess,
  gettingSiteListFailed,
} = siteData.actions;
export default siteData.reducer;
