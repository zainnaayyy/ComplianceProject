import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'
import { url } from "@/shared";

export const getFormTemplates = createAsyncThunk(
  "formTemplates",
  async (token, { dispatch, getState }) => {
    dispatch(gettingFormTemplateListLoading());
    fetch(`${url}/getAllFormTemplates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch(gettingFormTemplateListSuccess(result.formTemplates)))
      .catch((error) => dispatch(gettingFormTemplateListFailed(error)));
  }
);

const formTemplateData = createSlice({
  name: "formTemplate",
  initialState: {
    formTemplate: [],
    formTemplateLoading: false,
    formTemplateError: false,
    formTemplateErrorMessage: "",
    status: "idle",
  },
  reducers: {
    gettingFormTemplateListLoading: (state, action) => {
      state.formTemplate = [];
      state.formTemplateLoading = true;
      state.formTemplateError = false;
      state.formTemplateErrorMessage = null;
      state.status = "loading";
    },
    gettingFormTemplateListSuccess: (state, action) => {
      state.formTemplate = action.payload;
      state.formTemplateLoading = false;
      state.formTemplateError = false;
      state.formTemplateErrorMessage = null;
      state.status = "success";
    },
    gettingFormTemplateListFailed: (state, action) => {
      state.formTemplate = [];
      state.formTemplateLoading = false;
      state.formTemplateError = true;
      state.formTemplateErrorMessage = action.payload;
      state.status = "error";
    },
    gettingFormTemplateListClear: (state, action) => {
      state.formTemplate = [];
      state.formTemplateLoading = false;
      state.formTemplateError = false;
      state.formTemplateErrorMessage = null;
      state.status = "idle";
    },
  },
});

export const {
  gettingFormTemplateListClear,
  gettingFormTemplateListLoading,
  gettingFormTemplateListSuccess,
  gettingFormTemplateListFailed,
} = formTemplateData.actions;
export default formTemplateData.reducer;
