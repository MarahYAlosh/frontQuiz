import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import data from "../database/data";
import * as Action from "../redux/questionReducer";
// import { answers } from "../database/data";
import { getServerData } from "../helper/helper";

export const useFetchQuestion = (index,level) => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });
  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    //   fetch backend data

    (async () => {
      try {
        // let question = await data;
        // const [{ questions, answers }] = await getServerData(
        //   "http://localhost:5000/api/juniorQuestion",
        //   (data) => data.q
        // );

        const aa = await getServerData(`http://localhost:5000/api/${level}`, (data) => data.q)
       const { questions, answers } = aa[index]

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, apiData: { questions, answers } }));
          setGetData((prev) => ({ ...prev, isLoading: false }));
          // dispatch action
          dispatch(Action.startExamAction({ question: questions, answers }));
        } else {
          throw new Error("No question available");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, []);

  return [getData, setGetData];
};
export const moveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

export const movePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
