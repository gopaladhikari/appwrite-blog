import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./feature/authSlice";

const isDev = import.meta.env.DEV;

const rootReducers = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  devTools: isDev,
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;
