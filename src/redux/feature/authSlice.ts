import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  user: unknown;
};

type InitialState = Payload & {
  isAuthenticated: boolean;
};

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
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
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer; // export default authSlice.reducer
