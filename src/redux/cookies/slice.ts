import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CookiesSliceState } from "./types";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomRUHash = (max) => {
  var i,
    result = "";

  for (i = 0; i < max; i++) {
    result += String.fromCharCode(getRandomInt(1072, 1103));
  }

  return result.toUpperCase();
};

const fnNearestValue = (arr, val) => {
  return arr.reduce((nearest, num) =>
    Math.abs(num - val) >= Math.abs(nearest - val) && nearest < num
      ? nearest
      : num
  );
};

const fnGetRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initialState: CookiesSliceState = {
  sortedMode: "asc",
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
    9: {
      min: 1,
      max: 9,
    },
    19: {
      min: 10,
      max: 19,
    },
    50: {
      min: 20,
      max: 50,
    },
    99: {
      min: 51,
      max: 99,
    },
    999: {
      min: 100,
      max: 999,
    },
  },
};

export const ccookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    setCountItems: (state, action: PayloadAction<number>) => {
      state.countItems = action.payload;
      if (state.currentMode.min) {
        state.values = Array.from(Array(action.payload)).map((_) =>
          fnGetRandomIntInclusive(state.currentMode.min, state.currentMode.max)
        );
      } else {
        state.values = getRandomRUHash(action.payload).split("");
      }
    },
    setRandomValues: (state, action: PayloadAction<number>) => {
      const mode =
          state.modes[fnNearestValue(Object.keys(state.modes), action.payload)],
        min = mode.min,
        max = mode.max;
      state.currentMode = mode;

      state.values = Array.from(Array(state.countItems)).map((_) =>
        fnGetRandomIntInclusive(min, max)
      );
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
  ccookieSlice.actions;

export default ccookieSlice.reducer;
