import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'
import { url } from "@/shared";

export const getLOBs = createAsyncThunk(
  "LOBs",
  async (token, { dispatch, getState }) => {
    dispatch(gettingLOBListLoading());
    fetch(`${url}/getAllLOBs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch(gettingLOBListSuccess(result.lobs)))
      .catch((error) => dispatch(gettingLOBListFailed(error)));
    // await axios
    // .get(`${url}/`)
    // .then((response) => dispatch(gettingLOBListSuccess(response.data)))
    // .catch((error) => dispatch(gettingLOBListFailed(error)));
  }
);

const LOBData = createSlice({
  name: "LOBs",
  initialState: {
    LOBs: [],
    LOBsLoading: false,
    LOBsError: false,
    LOBsErrorMessage: "",
    status: "idle",
  },
  reducers: {
    gettingLOBListLoading: (state, action) => {
      state.LOBs = null;
      state.LOBsLoading = true;
      state.LOBsError = false;
      state.LOBsErrorMessage = null;
      state.status = "loading";
    },
    gettingLOBListSuccess: (state, action) => {
      state.LOBs = action.payload;
      state.LOBsLoading = false;
      state.LOBsError = false;
      state.LOBsErrorMessage = null;
      state.status = "success";
    },
    gettingLOBListFailed: (state, action) => {
      state.LOBs = null;
      state.LOBsLoading = false;
      state.LOBsError = true;
      state.LOBsErrorMessage = action.payload;
      state.status = "error";
    },
    gettingLOBListClear: (state, action) => {
      state.LOBs = null;
      state.LOBsLoading = false;
      state.LOBsError = false;
      state.LOBsErrorMessage = null;
      state.status = "idle";
    },
  },
});

export const {
  gettingLOBListClear,
  gettingLOBListLoading,
  gettingLOBListSuccess,
  gettingLOBListFailed,
} = LOBData.actions;
export default LOBData.reducer;
