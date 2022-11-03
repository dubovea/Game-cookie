import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { CookiesSliceState, Sorting } from "./types";
export const revertAll = createAction("REVERT_ALL");

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomRUHash = (max: number) => {
  var i,
    result = "";

  for (i = 0; i < max; i++) {
    result += String.fromCharCode(getRandomInt(1072, 1103));
  }

  return result.toUpperCase();
};

const randomNumbers = (min: number, max: number, count: number) => {
  let set = new Set();
  while (set.size < count) {
    let num = (Math.random() * (max - min + 1) + min) | 0;
    set.add(num);
  }
  return [...set];
};

const initialState: CookiesSliceState = {
  sortedMode: Sorting.ASC,
  countItems: 2,
  defaultCountItems: 2,
  values: ["А", "Я"],
  dropped: [],
  currentMode: {
    min: 0,
    max: 0,
  },
  modes: {
    0: {
      min: 0,
      max: 0,
    },
    1: {
      min: 1,
      max: 9,
    },
    2: {
      min: 10,
      max: 19,
    },
    3: {
      min: 20,
      max: 50,
    },
    4: {
      min: 51,
      max: 99,
    },
    5: {
      min: 100,
      max: 999,
    },
  },
};

export const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setCountItems: (state, action: PayloadAction<number>) => {
      state.countItems = action.payload;
      if (state.currentMode.min) {
        state.values = randomNumbers(
          state.currentMode.min,
          state.currentMode.max,
          action.payload
        );
      } else {
        state.values = getRandomRUHash(action.payload).split("");
      }
    },
    setRandomValues: (state, action: PayloadAction<number>) => {
      const mode = state.modes[action.payload],
        min = mode.min,
        max = mode.max;
      state.currentMode = mode;

      state.values = randomNumbers(min, max, state.countItems);
    },
    setDroppedCookies: (state, action: PayloadAction<any>) => {
      state.dropped = [...state.dropped].concat(action.payload);
    },
    setOrder: (state, action: PayloadAction<string>) => {
      state.sortedMode = action.payload;
    },
  },
});

export const { setCountItems, setRandomValues, setDroppedCookies, setOrder } =
  cookieSlice.actions;

export default cookieSlice.reducer;
