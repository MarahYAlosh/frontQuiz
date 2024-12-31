import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/TeacherInputs.css'
export const Popup = ({ open, setOpen }) => {
  const [name, setName] = useState();
  const [suc, setSuc] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
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
    <div className="popup-container">
      <div className="popup">
        <div className="popup-inner">
          <div className="popup__text">
            <h2>اضافة معلم جديد</h2>
            <form onSubmit={handleSubmit} className="forAll">
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

              {toggle === false && (
                <button className="floating-btn">تسجيل المعلم الجديد</button>
              )}
            </form>
          </div>
          <a className="popup__close" onClick={() => setOpen(false)}>
            X
          </a>
        </div>
      </div>
    </div>
  );
};
