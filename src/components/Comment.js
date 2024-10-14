import React, { useEffect, useState } from "react";
import "../styles/Comment.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  resetAllAction, resetTraceAction } from "../redux/questionReducer";
import levelAssessmt, {
  attempts_Number,
  convertminuteToSecond,
  convertSecondTominute,
  earnPoints_Number,
  flagResult,
  movingWithinLevel,
  sumArray,
} from "../helper/helper";
import { usePublishResult } from "../hooks/SetResult";
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
import axios from "axios";

export const Comment = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [timerWriteState, settimerWriteState] = useState();

  const navigate = useNavigate();
  const [navigateLink, setnavigateLink] = useState("");
  const [stateForGroup, setstateForGroup] = useState();


  const {
    questions: { queue, answers },
    result: { result, userId, index, earnPoints, seconds, level },
  } = useSelector((state) => state);

  const earnPoint = earnPoints_Number(result, answers, 10);

  const attempts = attempts_Number(result);
  const totalPoints = queue.length * 10;
  const flag = flagResult(totalPoints, earnPoint);

  const earnPercent = (earnPoint / 10 / totalPoints) * 1000;

  // console.log(
  //   movingWithinLevel(
  //     earnPercent,
  //     earnPoint,
  //     state.seconds,
  //     index,
  //     dispatch,
  //     increaseIndex,
  //     increaseEarnPoints,
  //     increaseSeconds
  //   )
  // );
  const timerWrite = convertSecondTominute(state.seconds);

  useEffect(() => {
    timerWrite.then((data) => settimerWriteState(data));
    console.log(earnPoints);
  });
  // const { second, minute } = state;

  // usePublishResult({
  //   result,
  //   username: userId.toString(),
  //   attempts,
  //   points: earnPoint,
  //   achived: flag ? "Passed" : "Failed",
  //   timer: state.seconds,
  // });


 



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

  // useEffect(() => {
  //   if (index < 4) {
  //     dispatch(resetAllAction());
  //     dispatch(increaseIndex());
  //     dispatch(resetResultOnlyAction());
  //     dispatch(increaseEarnPoints(earnPoint));
  //     dispatch(increaseSeconds(state.seconds));
  //     setnavigateLink("quiz");
  //   } else {
  //     dispatch(resetAllAction());
  //     dispatch(increaseEarnPoints(earnPoint));
  //     dispatch(increaseSeconds(state.seconds));

  //     // dispatch(addsumseconds(sumArray(seconds)));
  //     // dispatch(addsumearnPoints(sumArray(earnPoints)));
  //     // dispatch(resetEndLevelAction());
  //     // dispatch(increaseLevel());
  //     setnavigateLink("quiz");
  //   }
  // }, []);

  useEffect(() => {
    if (index === state.dataLength-1) {
      setnavigateLink("result");
    }
  }, [level]);

//   useEffect(()=>{

//   },[])
  useEffect(() => {
    if (earnPoints[index - 1] !== undefined) {
      if (
        earnPoints[index - 1] >= 40 &&
        seconds[index - 1] <  queue.length * 60
      ) {
        setstateForGroup("excellent");
      }
      if (
        earnPoints[index - 1] >= 40 &&
        seconds[index - 1] >=  queue.length * 60
      ) {
        setstateForGroup("excellentBadTime");
      }
      if (
        earnPoints[index - 1] < 40 &&
        earnPoints[index - 1] > 20 &&
        seconds[index - 1] <  queue.length * 60
      ) {
        setstateForGroup("good");
      }
      if (
        earnPoints[index - 1] < 40 &&
        earnPoints[index - 1] > 20 &&
        seconds[index - 1] >=  queue.length * 60
      ) {
        setstateForGroup("goodBadTime");
      }
      if (earnPoints[index - 1] <= 20) {
        setstateForGroup("bad");
      }
    }

    // setearnPointForGroup(earnPoints[index-1]);
    // setsecondsForGroup(seconds[index-1]);
  }, [index]);

  console.log(stateForGroup);
  //console.log(secondsForGroup);

  function goToQuizClick() {
    if (index < state.dataLength) {
    } else {
      dispatch(addsumseconds(sumArray(seconds)));
      dispatch(addsumearnPoints(sumArray(earnPoints)));
      dispatch(resetEndLevelAction());
      dispatch(increaseLevel());
      // dispatch(addsumseconds(sumArray(seconds)));
      // dispatch(addsumearnPoints(sumArray(earnPoints)));
      // console.log(sumArray(earnPoints));
      // console.log(earnPoints);
      // console.log(seconds);
      // dispatch(resetEndLevelAction());
    }
  }

  //تابع لايجاد اذا نجح او سقط من خلال الثواني المستخدم
  //console.log(levelAssessmt(seconds,queue.length));
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
            {/* <p>
              We've sent a confirmation to your e-mail
              <br />
              for verification.
            </p> */}
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
            {/* <span className="change">-- Click to see opposite state --</span> */}
          </div>
          {/*/.success*/}
        </div>
        {/*/.row*/}

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
            {/*/.icon*/}
            <h1>
              {" "}
              {stateForGroup === "bad"
                ? "عليك بالتركيز اكثر"
                : "عمل جيد لكن انتبه الى الوقت"}
            </h1>
            {/* <p>
              Oops! Something went wrong,
              <br /> you should try again.
            </p> */}
            <button
              type="button"
              className="redo btn"
             // onClick={goToQuizClick}
           
            >
             <Link
                className="btn"
                onClick={goToQuizClick}
                to={`../${navigateLink}`}
                state={{ dataLength: state.dataLength }}
              >
                  الذهاب للمجموعة التالية
              </Link>
            </button>
            {/* <span className="change">-- Click to see opposite state --</span> */}
          </div>
          {/*/.success*/}
        </div>
        {/*/.row*/}
      </div>
     
      {/*/.container*/}
    </>
  );
};
