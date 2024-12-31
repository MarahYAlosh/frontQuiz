import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/TeacherInputs.css";
import logo from "../img/onlineEdu.png";
import { Popup } from "./Popup";

export const TeacherPage = () => {
  const [suc, setSuc] = useState();
  const [level, setlevel] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("https://mernstackquiz-8.onrender.com/addTeacher", {
        name,
        email,
        password,
      })
      .then((res) => console.log("yes"))
      .catch((err) => alert(err));
    setToggle(true);
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("https://mernstackquiz-8.onrender.com/teacher")
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
      <a className="button" onClick={() => setOpen(true)} style={{fontSize:'24px'}}>
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
  
              <option value="juniorQuestion">junior question</option>
              <option value="middleQuestion">middle question</option>
              <option value="advancedQuestion">advanced question</option>
            </select>
          </div>
          <button className="button" role="button">
            <Link to={`/teacherInputs`} state={{ level: level }}>
              Go
            </Link>
          </button>
        </div>
      </div>

      {open && <Popup setOpen={setOpen} open={open} />}
    </div>
  );
};
