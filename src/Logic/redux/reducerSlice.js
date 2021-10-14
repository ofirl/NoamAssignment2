import { createSlice } from "@reduxjs/toolkit";

import initialState from "./initialState";
import { usersReducers, themeReducers, topMenuReducers } from "./reducers"


export const reducerSlice = createSlice({
  name: "actions",
  initialState: initialState,
  reducers: {
    ...usersReducers,
    ...themeReducers,
    ...topMenuReducers
  },
});

export const {
  setUserList,
  updateUser,
  addUser,
  deleteUser,
  setCurrentTab,
  toggleCurrentThemeType,
  setCurrentCollection,
} = reducerSlice.actions;

export default reducerSlice.reducer;