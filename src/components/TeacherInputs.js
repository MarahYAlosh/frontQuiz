import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/TeacherInputs.css";
import src from "../img/ففف";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TeacherInputs = () => {
  const { state } = useLocation();
  const [text, setText] = useState("");
  const [question, setQusetion] = useState("");
  const [options, setOptions] = useState("");
  const [trueOptions, setTrueOptions] = useState("");
  const [errorState, seterrorState] = useState(false);
  const [allQuestion, setAllQuestion] = useState([]);
  const [allAnswer, setAllAnswer] = useState([]);

  let questionsObj = {};
  let answersInputs;

  if (text && question && options) {
    questionsObj = {
      text: text,
      question: question,
      options: options.split(","),
    };
  }

  if (questionsObj !== {}) {
    const aa = questionsObj.options;
    if (aa !== undefined) {
      answersInputs = aa.indexOf(trueOptions);
    }
  }

  useEffect(() => {
    if (
      allQuestion.length === 5 &&
      allAnswer.length === 5 &&
      !allAnswer.includes(-1) &&
      !allAnswer.includes(undefined)
    ) {
      axios.post(`https://mernstackquiz-8.onrender.com/api/${state.level}`, {
        allQuestion,
        allAnswer,
      });
    }
  }, [allQuestion, allAnswer, state.level]);

  useEffect(() => {
    if (allAnswer.includes(-1) || allAnswer.includes(undefined)) {
      seterrorState(true);
      toast.warn("يجب ادخال الخيار الصحيح من ضمن الخيارات المدخلة");
    } else {
      seterrorState(false);
      
    }
  }, [allAnswer]);

  const handleSubmit = () => {
    if (answersInputs === -1 || answersInputs === undefined) {
      toast.error("يجب التأكد من الخيارات المدخلة.");
      return;
    }
    setAllQuestion((prev) => [...prev, questionsObj]);
    setAllAnswer((prev) => [...prev, answersInputs]);
    toast.success("تم إضافة السؤال بنجاح!");
  };

  return (
    <div className="teacherCont">
      <ToastContainer /> 
      <div className="sec-1">
        <div className="left">
          <img src={src} alt="Descriptive Alt Text" className="animated-img" />
        </div>

        <div className="right">
          <div className="teacherContainer">
            <div className="form">
              <div className="form-panel one">
                <div className="form-header">
                  <h1>تسجيل الاسئلة</h1>
                </div>
                <div className="form-content">
                  <form>
                    <div className="form-group">
                      <label htmlFor="text">النص التعليمي</label>
                      <textarea
                        id="text"
                        required
                        placeholder="ادخل النص التعليمي "
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        cols="20"
                        rows="2"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="question">السؤال</label>
                      <input
                        id="question"
                        type="text"
                        placeholder="ادخل السؤال"
                        name="question"
                        onChange={(e) => setQusetion(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="Options">الخيارات</label>
                      <input
                        id="Options"
                        type="text"
                        placeholder="ادخل الخيارات"
                        name="options"
                        onChange={(e) => setOptions(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="option">الخيار الصحيح</label>
                      <input
                        id="option"
                        required
                        type="text"
                        placeholder="ادخل الخيار الصحيح"
                        name="option"
                        onChange={(e) => setTrueOptions(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      {allQuestion.length < 5 ? (
                        <button
                        type="button"
                        style={{ cursor: errorState && "no-drop" }}
                        onClick={handleSubmit}
                        disabled={errorState}
                      >
                        {allQuestion.length === 4
                          ? "ارسال"
                          : allQuestion.length !== 0
                          ? errorState
                            ? `لا يمكن الاضافة`
                            : `اضافة(${allQuestion.length + 1})`
                          : "اضافة"}
                      </button>
                      ) : (
                        <Link className="btnLogin" to="/login">
                          العودة الى صفحة تسجيل الدخول
                        </Link>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
