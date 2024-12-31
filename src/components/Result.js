import React, { useEffect, useState } from "react";
import "../styles/Result.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction, resetTraceAction } from "../redux/questionReducer";
import {
  resetResultAction,
  resetResultOnlyAction,
} from "../redux/resultReducer";
import { convertSecondTominute, flagResult } from "../helper/helper";
import { usePublishResult } from "../hooks/SetResult";

export const Result = () => {
  let levels = ["juniorQuestion", "middleQuestion", "advancedQuestion"];

  const dispatch = useDispatch();
  const { state } = useLocation();
  const [timeTotal, settimeTotal] = useState();
  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }
  console.log(state);
  const {
    questions: { queue, answers },
    result: { result, userId, sumearnPoints, sumseconds, level },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10 * state.dataLength;
  const flag = flagResult(totalPoints, sumearnPoints);

  console.log(levels[level - 1]);

  usePublishResult({
    result,
    username: userId.toString(),
    level: levels[level - 1],
    points: sumearnPoints,
    achived: flag ? "Passed" : "Failed",
    timer: sumseconds,
  });
  function goToQuizClick() {
    dispatch(resetResultOnlyAction());
    dispatch(resetTraceAction());
  }

  convertSecondTominute(sumseconds).then((data) => settimeTotal(data));

  return (
    <div className="containerResult">
      <div className="container">
        <h1 className="title ">تطبيق تعليمي</h1>

        <div className="result flex-center">
          <div className="flex">
            <span>المستوى : </span>
            <span className="bold">
              {levels[level - 1] === "juniorQuestion"
                ? "المستوى الأول"
                : levels[level - 1] === "middleQuestion"
                ? "المستوى الثاني"
                : "المستوى الثالث"}
            </span>
          </div>

          <div className="flex">
            <span>مجموع نقاط الاختبار: </span>
            <span className="bold">{totalPoints || 0}</span>
          </div>

          <div className="flex">
            <span>مجموع الأسئلة : </span>
            <span className="bold">{queue.length * state.dataLength || 0}</span>
          </div>

          <div className="flex">
            <span>إجمالي كسب النقاط</span>
            <span className="bold">{sumearnPoints || 0}</span>
          </div>

          <div className="flex">
            <span>الوقت المستغرق </span>
            <span className="bold" style={{ direction: "ltr" }}>
              {timeTotal}
            </span>
          </div>

          <div className="flex">
            <span>نتيجة الاختبار </span>
            <span
              className={`bold ${flag ? "success" : "failure"}`}
              style={{
                color: flag ? "#2aff95" : "#ff2a66",
              }}
            >
              {flag ? "ناجح" : "راسب"}
            </span>
          </div>
        </div>
        <div className="start">
          {sumearnPoints < 100 ? (
            <Link className="btn" to="/login" onClick={onRestart}>
              Restart
            </Link>
          ) : (
            level <= 2 && (
              <Link className="btn" to="../quiz" onClick={goToQuizClick}>
                الذهاب للمستوى التالي
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};
