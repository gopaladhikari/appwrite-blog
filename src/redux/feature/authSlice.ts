import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  username: string;
  password: string;
};

type InitialState = Payload & {
  isAuthenticated: boolean;
};

const initialState: InitialState = {
  isAuthenticated: false,
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions: PayloadAction<Payload>) => ({
      ...state,
      isAuthenticated: true,
      ...actions.payload,
    }),
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer; // export default authSlice.reducer
