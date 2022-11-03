import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayoutSliceState } from "./types";

import startSound from "../../assets/songs/startSound.mp3";

const initialState: LayoutSliceState = {
  backgroundImg: "",
  sound: startSound,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setBackgroundImg: (state, action: PayloadAction<string>) => {
      state.backgroundImg = action.payload;
    },
  },
});

export const { setBackgroundImg } = layoutSlice.actions;

export default layoutSlice.reducer;
