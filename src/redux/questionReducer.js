import { createSlice } from "@reduxjs/toolkit";
export const questionReducer = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      let { question, answers } = action.payload;
      return {
        ...state,
        queue: question,
        answers: answers,
      };
    },
    moveNextAction: (state, action) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    movePrevAction: (state, action) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    resetTraceAction: (state, action) => {
      return {
        ...state,
        trace: 0,
      };
    },
    resetAllAction: () => {
      return {
        queue: [],
        answers: [],
        trace: 0,
      };
    },
  },
});
export const {
  startExamAction,
  moveNextAction,
  movePrevAction,
  resetAllAction,
  resetTraceAction,
} = questionReducer.actions;
export default questionReducer.reducer;
