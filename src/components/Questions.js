import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { earnPoints_Number } from "../helper/helper";
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/SetResult";
import { updateResultAction } from "../redux/resultReducer";

export const Questions = ({ onChecked, setappear, appear }) => {
  let levels = ["juniorQuestion", "middleQuestion", "advancedQuestion"];
  let index = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const indexRedux = useSelector((state) => state.result.index);
  const levelRedux = useSelector((state) => state.result.level);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(undefined);
  const [appearCommentTrue, setappearCommentTrue] = useState();
  const [appearCommentFalse, setappearCommentFalse] = useState();

  const [{ isLoading, apiData, serverError }, setGetData] = useFetchQuestion(
    index[indexRedux],
    levels[levelRedux]
  );
  const correctAnswers = useSelector((state) => state.questions.answers);

  function onSelect(i) {
    console.log(trace);
    console.log(checked);
    setChecked(i);
    onChecked(i);
    dispatch(updateResult({ trace, checked }));

    console.log(i);
    if (correctAnswers[trace] === i) {
      console.log(appearCommentTrue);
    } else {
      console.log(appearCommentFalse);
    }
  }

  const state = useSelector((state) => state);
  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const trace = useSelector((state) => state.questions.trace);

  const queue = useSelector((state) => state.questions.queue);
  const answers = useSelector((state) => state.questions.answers);
  const result = useSelector((state) => state.result.result);

  useEffect(() => {
    const earnPoints = earnPoints_Number(result, answers, 10);
  }, [result, answers]);

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  if (serverError) {
    return <h4 className="text-light">{serverError || "unKnown"}</h4>;
  }

  return (
    <div className="questions">
      <div className="start textt">
        <h2
          style={{ display: appear ? "none" : "block", marginBottom: "40px" }}
        >
          {questions?.text}
        </h2>
        <button
          style={{ display: appear ? "none" : "block" }}
          className="btn"
          to="quiz"
          onClick={() => {
            setappear(true);
          }}
        >
          انقر لعرض السؤال
        </button>
      </div>
      {appear && (
        <>
          <h2>{questions?.question}</h2>
          <ul key={questions?.id}>
            {questions?.options.map((q, i) => (
              <li key={i} className="options">
                <input
                  type="radio"
                  value={false}
                  name="options"
                  id={`q${i}-option`}
                  onChange={() => onSelect(i)}
                />
                <label className="text-primary" htmlFor={`q${i}-option`}>
                  {q}
                </label>
                <div
                  className={`check ${result[trace] == i ? "checked" : ""}`}
                ></div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
