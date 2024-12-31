import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { moveNextQuestion, movePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/SetResult";
import logo from "../img/onlineEdu.png";

import { Questions } from "./Questions";
import StopWatch from "./StopWatch";
import srcBg1 from "../img/output-onlinepngtools (11).png";
import srcBg2 from "../img/output-onlinepngtools (12).png";
import srcBg3 from "../img/output-onlinepngtools (13).png";

export const Quiz = () => {
  let levels = ["juniorQuestion", "middleQuestion", "advancedQuestion"];
  const [appear, setappear] = useState(false);

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(undefined);
  const { trace, queue } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const index = useSelector((state) => state.result.index);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const level = useSelector((state) => state.result.level);
  const [dataLength, setdataLength] = useState();
  const [dataAnswer, setdataAnswer] = useState();

  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://mernstackquiz-8.onrender.com/api/${levels[level]}`)
      .then(({ data }) => {
        setdataLength(data.q.length);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://mernstackquiz-8.onrender.com/api/${levels[level]}`)
      .then(({ data }) => {
        setdataAnswer(data ? data.q[index].answers[trace] : 0);
      });
  }, [trace]);

  function onPrev() {
    if (trace > 0) dispatch(movePrevQuestion());
  }
  function onNext() {
    if (trace < queue.length) {
      dispatch(moveNextQuestion());
      if (result.length <= trace) {
        dispatch(PushAnswer(checked));
      }
    }
    setChecked(undefined);
    setappear(false);
  }

  function onChecked(check) {
    setChecked(check);
  }

  useEffect(() => {
    if (result.length && result.length >= queue.length) {
      setIsDone(true);
    }
  }, [result]);

  console.log(checked);
  console.log(dataAnswer);
  console.log(trace);

  return (
    <div
      className="containerQuiz"
      style={{
        backgroundImage:
          index === 0
            ? `url('${srcBg1}')`
            : index === 1
            ? `url('${srcBg2}')`
            : `url('${srcBg3}')`,
      }}
    >
      <div className="logoimg">
        <img src={logo} alt="" />
      </div>
      <div className="container">
        <div className="levels">
          <div
            className="level"
            style={{
              background:
                level === 0 || level === 1 || level === 2 ? "none" : "",
              color: "black",
            }}
          >
            1
          </div>
          <div
            className="level"
            style={{
              background: level === 1 || level === 2 ? "none" : "",
              color: level === 1 || level === 2 ? "black" : "",
            }}
          >
            2
          </div>
          <div
            className="level"
            style={{
              background: level === 2 ? "none" : "",
              color: level === 2 ? "black" : "",
            }}
          >
            3
          </div>
        </div>
        <div className="title ">
          {index === 0
            ? "المجموعة الأولى"
            : index === 1
            ? "المجموعة الثانية"
            : index === 2
            ? " المجموعة الثالثة"
            : "المجموعة الرابعة"}

          <StopWatch
            done={isDone}
            handlePauseResume={(e) => {
              console.log(e.second + e.minute * 60, "sdfdsfsdf");
              return navigate(`/Comment`, {
                state: {
                  seconds: e.second + e.minute * 60,
                  dataLength: dataLength,
                },
              });
            }}
          />
        </div>

        <Questions
          onChecked={onChecked}
          appear={appear}
          setappear={setappear}
          dataLength={dataLength}
          checkedQuiz={checked}
          dataAnswer={dataAnswer}
        />

        <div className="grid">
          {trace > 0 ? (
            <button
              style={{ display: appear ? "block" : "none" }}
              onClick={onPrev}
              className="btn prev"
            >
              السابق
            </button>
          ) : (
            <div></div>
          )}

          <button
            style={{ display: appear ? "block" : "none" }}
            onClick={onNext}
            className="btn next"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};
