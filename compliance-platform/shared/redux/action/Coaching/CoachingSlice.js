import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'
import { url } from "@/shared";

export const getCoaching = createAsyncThunk(
  "coaching",
  async (token, { dispatch, getState }) => {
    dispatch(gettingCoachingListLoading());
    fetch(`${url}/getAllCoachings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch(gettingCoachingListSuccess(result.coaching)))
      .catch((error) => dispatch(gettingCoachingListFailed(error)));
    // await axios
    // .get(`${url}/`)
    // .then((response) => dispatch(gettingCoachingListSuccess(response.data)))
    // .catch((error) => dispatch(gettingCoachingListFailed(error)));
  }
);

const coachingData = createSlice({
  name: "coaching",
  initialState: {
    coaching: [],
    coachingLoading: false,
    coachingError: false,
    coachingErrorMessage: "",
    status: "idle",
  },
  reducers: {
    gettingCoachingListLoading: (state, action) => {
      state.coaching = [];
      state.coachingLoading = true;
      state.coachingError = false;
      state.coachingErrorMessage = null;
      state.status = "loading";
    },
    gettingCoachingListSuccess: (state, action) => {
      state.coaching = action.payload;
      state.coachingLoading = false;
      state.coachingError = false;
      state.coachingErrorMessage = null;
      state.status = "success";
    },
    gettingCoachingListFailed: (state, action) => {
      state.coaching = [];
      state.coachingLoading = false;
      state.coachingError = true;
      state.coachingErrorMessage = action.payload;
      state.status = "error";
    },
    gettingCoachingListClear: (state, action) => {
      state.coaching = [];
      state.coachingLoading = false;
      state.coachingError = false;
      state.coachingErrorMessage = null;
      state.status = "idle";
    },
  },
});

export const {
  gettingCoachingListClear,
  gettingCoachingListLoading,
  gettingCoachingListSuccess,
  gettingCoachingListFailed,
} = coachingData.actions;
export default coachingData.reducer;
