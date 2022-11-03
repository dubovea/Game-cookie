import { configureStore } from "@reduxjs/toolkit";
import cookies from "./cookies/slice";
import layout from "./layout/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    cookies,
    layout,
  },
});

store.subscribe(() => {
  // const { items, totalPrice } = store.getState().cart;
  // localStorage.setItem('items', JSON.stringify(items));
  // localStorage.setItem('totalPrice', totalPrice.toString());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispath = () => useDispatch<AppDispatch>();
