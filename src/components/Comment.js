import React, { useEffect, useState } from "react";
import "../styles/Comment.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetTraceAction } from "../redux/questionReducer";
import {
  attempts_Number,
  convertSecondTominute,
  earnPoints_Number,
  flagResult,
  sumArray,
} from "../helper/helper";

import {
  addsumearnPoints,
  addsumseconds,
  increaseEarnPoints,
  increaseIndex,
  increaseLevel,
  increaseSeconds,
  resetEndLevelAction,
  resetResultAction,
  resetResultOnlyAction,
} from "../redux/resultReducer";

export const Comment = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [timerWriteState, settimerWriteState] = useState();

  const [navigateLink, setnavigateLink] = useState("");
  const [stateForGroup, setstateForGroup] = useState();

  const {
    questions: { queue, answers },
    result: { result, index, earnPoints, seconds, level },
  } = useSelector((state) => state);

  const earnPoint = earnPoints_Number(result, answers, 10);

  const timerWrite = convertSecondTominute(state.seconds);

  useEffect(() => {
    timerWrite.then((data) => settimerWriteState(data));
  });

  useEffect(() => {
    function quizLevel() {
      if (index < state.dataLength) {
        dispatch(increaseIndex());
        dispatch(increaseEarnPoints(earnPoint));
        dispatch(increaseSeconds(state.seconds));

        dispatch(resetResultOnlyAction());
        dispatch(resetTraceAction());
        console.log(" no end level");
        setnavigateLink("quiz");
      } else {
        dispatch(increaseEarnPoints(earnPoint));
        dispatch(increaseSeconds(state.seconds));
        dispatch(increaseLevel());
        dispatch(resetTraceAction());
        setnavigateLink("result");
      }
    }
    quizLevel();
  }, []);

  useEffect(() => {
    if (index === state.dataLength - 1) {
      setnavigateLink("result");
    }
  }, [level]);

  useEffect(() => {
    if (earnPoints[index - 1] !== undefined) {
      if (
        earnPoints[index - 1] >= 40 &&
        seconds[index - 1] < queue.length * 60
      ) {
        setstateForGroup("excellent");
      }
      if (
        earnPoints[index - 1] >= 40 &&
        seconds[index - 1] >= queue.length * 60
      ) {
        setstateForGroup("excellentBadTime");
      }
      if (
        earnPoints[index - 1] < 40 &&
        earnPoints[index - 1] > 20 &&
        seconds[index - 1] < queue.length * 60
      ) {
        setstateForGroup("good");
      }
      if (
        earnPoints[index - 1] < 40 &&
        earnPoints[index - 1] > 20 &&
        seconds[index - 1] >= queue.length * 60
      ) {
        setstateForGroup("goodBadTime");
      }
      if (earnPoints[index - 1] <= 20) {
        setstateForGroup("bad");
      }
    }
  }, [index]);

  console.log(stateForGroup);

  function goToQuizClick() {
    if (index < state.dataLength) {
    } else {
      dispatch(addsumseconds(sumArray(seconds)));
      dispatch(addsumearnPoints(sumArray(earnPoints)));
      dispatch(resetEndLevelAction());
      dispatch(increaseLevel());
    }
  }

  console.log(state.dataLength);
  return (
    <>
      <div className="background" />

      <div className="containerComment">
        <div className="row">
          <div
            className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate"
            style={{
              display:
                stateForGroup === "excellent" ||
                stateForGroup === "excellentBadTime" ||
                stateForGroup === "good"
                  ? "block"
                  : "none",
            }}
          >
            <div className="icon">
              <i class="bi bi-emoji-smile"></i>
            </div>
            {/*/.icon*/}
            <h1>
              {" "}
              {stateForGroup === "excellent"
                ? "أحسنت العمل "
                : stateForGroup === "excellentBadTime"
                ? "أحسنت العمل لكن انتبه الى الوقت"
                : "عمل جيد"}
            </h1>

            <button type="button" className="redo btn">
              <Link
                className="btn"
                onClick={goToQuizClick}
                to={`../${navigateLink}`}
                state={{ dataLength: state.dataLength }}
              >
                الذهاب للمجموعة التالية
              </Link>
            </button>
          </div>
        </div>

        <div className="row">
          <div
            className="modalbox error col-sm-8 col-md-6 col-lg-5 center animate"
            style={{
              display:
                stateForGroup === "excellent" ||
                stateForGroup === "excellentBadTime" ||
                stateForGroup === "good"
                  ? "none"
                  : "block",
            }}
          >
            <div className="icon">
              <i class="bi bi-emoji-frown"></i>
            </div>

            <h1>
              {" "}
              {stateForGroup === "bad"
                ? "عليك بالتركيز اكثر"
                : "عمل جيد لكن انتبه الى الوقت"}
            </h1>

            <button type="button" className="redo btn">
              <Link
                className="btn"
                onClick={goToQuizClick}
                to={`../${navigateLink}`}
                state={{ dataLength: state.dataLength }}
              >
                الذهاب للمجموعة التالية
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
