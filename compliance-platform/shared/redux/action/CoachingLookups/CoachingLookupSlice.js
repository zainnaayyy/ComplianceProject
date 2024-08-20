import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'
import { url } from "@/shared";

export const getCoachingLookups = createAsyncThunk(
  "coachingLookups",
  async (token, { dispatch, getState }) => {
    dispatch(gettingCoachingLookupListLoading());
    fetch(`${url}/getAllCoachingLookup`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch(gettingCoachingLookupListSuccess(result.coachingLookups)))
      .catch((error) => dispatch(gettingCoachingLookupListFailed(error)));
    // await axios
    // .get(`${url}/`)
    // .then((response) => dispatch(gettingCoachingLookupListSuccess(response.data)))
    // .catch((error) => dispatch(gettingCoachingLookupListFailed(error)));
  }
);

const coachingLookupsData = createSlice({
  name: "coachingLookups",
  initialState: {
    coachingLookups: [],
    coachingLookupsLoading: false,
    coachingLookupsError: false,
    coachingLookupsErrorMessage: "",
    status: "idle",
  },
  reducers: {
    gettingCoachingLookupListLoading: (state, action) => {
      state.coachingLookups = [];
      state.coachingLookupsLoading = true;
      state.coachingLookupsError = false;
      state.coachingLookupsErrorMessage = null;
      state.status = "loading";
    },
    gettingCoachingLookupListSuccess: (state, action) => {
      state.coachingLookups = action.payload;
      state.coachingLookupsLoading = false;
      state.coachingLookupsError = false;
      state.coachingLookupsErrorMessage = null;
      state.status = "success";
    },
    gettingCoachingLookupListFailed: (state, action) => {
      state.coachingLookups = [];
      state.coachingLookupsLoading = false;
      state.coachingLookupsError = true;
      state.coachingLookupsErrorMessage = action.payload;
      state.status = "error";
    },
    gettingCoachingLookupListClear: (state, action) => {
      state.coachingLookups = [];
      state.coachingLookupsLoading = false;
      state.coachingLookupsError = false;
      state.coachingLookupsErrorMessage = null;
      state.status = "idle";
    },
  },
});

export const {
  gettingCoachingLookupListClear,
  gettingCoachingLookupListLoading,
  gettingCoachingLookupListSuccess,
  gettingCoachingLookupListFailed,
} = coachingLookupsData.actions;
export default coachingLookupsData.reducer;
