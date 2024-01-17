import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./reducers/authenticationSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    userReducer: userSlice,
    authenticationReducer: authenticationSlice,
  },
});

export default store;