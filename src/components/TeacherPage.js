import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/TeacherInputs.css";
import logo from "../img/onlineEdu.png"

export const TeacherPage = () => {
  const [suc, setSuc] = useState();
  const [level, setlevel] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios
      .post("http://localhost:5000/addTeacher", { name, email, password })
      .then((res) => console.log('yes'))
      .catch((err) => alert(err));
      setToggle(true)
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/teacher")
      .then((res) => {
        if (res.data === "Success") {
          setSuc("Successed OK");
        } else {
          navigate("/");
        }
      })
      .catch((err) => alert(err));
  });

  return (
    <div className="containerAll">
    <div className="logoimg">
        <img src={logo} alt="" />
      </div>
      <div className="containerBg">
      <a className="button" href="#popup" style={{ fontSize: '24px'}}>
            اضافة معلم
          </a>
        <div className="containerTeacher">
    
          <div id="contTeach">
            <blockquote className="speech-bubble">
              <div className="box">
                <div className="marquee-one">
                  يجب تحديد لأي مستوى تضاف الأسئلة
                </div>
              </div>
            </blockquote>
          </div>
          <div className="box">
            <select onChange={(e) => setlevel(e.target.value)}>
              {/*
  <select onChange={(e) => setlevel(e.target.value)}>
        <option value="juniorQuestion">junior question</option>
        <option value="middleQuestion">middle question</option>
        <option value="advancedQuestion">advanced question</option>
      </select> 
   */}
              <option value="juniorQuestion">junior question</option>
              <option value="middleQuestion">middle question</option>
              <option value="advancedQuestion">advanced question</option>
            </select>
          </div>
          <button className="button-62" role="button">
            <Link to={`/teacherInputs`} state={{ level: level }}>
              Go
            </Link>
          </button>
        </div>
      </div>

      <div className="popup" id="popup">
        <div className="popup-inner">
         
          <div className="popup__text">
          <h2>اضافة معلم جديد</h2>
            <form onSubmit={handleSubmit} className='forAll'>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required="required"
                />
                <label className="form-label">الاسم</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required="required"
                />
                <label className="form-label">البريد الالكتروني </label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required="required"
                />
                <label className="form-label"> كلمة السر</label>
              </div>
             
        {
          toggle===false &&
          <button className="floating-btn" >
                تسجيل المعلم الجديد
              </button>
        }
            </form>
          </div>
          <a className="popup__close" href="#">
            X
          </a>
        </div>
      </div>
    </div>
  );
};
