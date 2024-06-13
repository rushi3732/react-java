import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./Slice/wizard";
import authReducer from "./Authorization/slices/auth";
import messageReducer from "./Authorization/slices/message";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    form: formReducer,
  },
  devTools: true,
});

export default store;
