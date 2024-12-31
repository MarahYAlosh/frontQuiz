import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import picLogin from "../img/reg.png";

export const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://mernstackquiz-8.onrender.com/register", {
        name,
        email,
        password,
      })
      .then((res) => navigate("/login"))
      .catch((err) => alert(err));
  };
  return (
    <div className="loginContainer">
      <div className="panel-lite">
        <div className="thumbur">
          <img src={picLogin} alt="" />
        </div>
        <h4>Sign Up</h4>
        <form onSubmit={handleSubmit}>
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
          <Link to="/login">
            <a href="#"> تسجيل الدخول</a>
          </Link>
          <button className="floating-btn">
            <i className="icon-arrow" />
          </button>
        </form>
      </div>
    </div>
  );
};
