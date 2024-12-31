import { createSlice } from "@reduxjs/toolkit";
export const resultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    result: [],
    index: 0,
    level: 0,
    earnPoints: [],
    seconds: [],
    sumearnPoints: Number,
    sumseconds: Number,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload);
      console.log(action.payload);
    },
    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload;
      state.result.fill(checked, trace, trace + 1);
    },
    resetResultOnlyAction: (state, action) => {
      return {
        ...state,
        result: [],
      };
    },
    resetResultAction: () => {
      return {
        userId: null,
        result: [],
        level: 0,
        earnPoints: [],
        seconds: [],
      };
    },
    increaseIndex: (state, action) => {
      state.index++;
      // console.log(state.index);
    },

    increaseEarnPoints: (state, action) => {
      state.earnPoints.push(action.payload);
    },

    increaseSeconds: (state, action) => {
      state.seconds.push(action.payload);
    },
    resetEndLevelAction: (state, action) => {
      return {
        ...state,
        result: [],
        index: 0,

        earnPoints: [],
        seconds: [],
      };
    },

    increaseLevel: (state, action) => {
      state.level++;
    },
    addsumearnPoints: (state, action) => {
      state.sumearnPoints = action.payload;
    },

    addsumseconds: (state, action) => {
      state.sumseconds = action.payload;
    },
  },
});
export const {
  setUserId,
  pushResultAction,
  resetResultAction,
  updateResultAction,
  increaseIndex,
  increaseLevel,
  increaseEarnPoints,
  increaseSeconds,
  resetResultOnlyAction,
  resetEndLevelAction,
  addsumearnPoints,
  addsumseconds,
} = resultReducer.actions;
export default resultReducer.reducer;
