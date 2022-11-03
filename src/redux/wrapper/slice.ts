import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WrapperSliceState } from "./types";

import startSound from "../../assets/sounds/main.mp3";

const initialState: WrapperSliceState = {
  themePath: "theme1",
  themes: 4,
  backgroundImg: "",
  sound: startSound,
};

export const wrapperSlice = createSlice({
  name: "wrapper",
  initialState,
  reducers: {
    setBackgroundImg: (state, action: PayloadAction<string>) => {
      state.backgroundImg = action.payload;
    },
    setCurrentThemePath: (state, action: PayloadAction<string>) => {
      state.themePath = action.payload;
    },
  },
});

export const { setBackgroundImg, setCurrentThemePath } = wrapperSlice.actions;

export default wrapperSlice.reducer;
