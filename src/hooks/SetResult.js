/* eslint-disable no-unused-expressions */
import { postServerData } from "../helper/helper";
import * as Action from "../redux/resultReducer";

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};
export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};
export const usePublishResult = (resultData) => {
  const { result, username } = resultData;
  (async () => {
    try {
      if (result !== [] && !username) throw new Error("Couldn't get Result");
      const rr = await postServerData(
        "https://mernstackquiz-8.onrender.com/api/result",
        resultData,
        (data) => data.r
      );
      console.log(rr);
    } catch (error) {
      console.log(error);
    }
  })();
};
