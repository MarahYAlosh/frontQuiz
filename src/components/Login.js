import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import picLogin from "../img/login.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mernstackquiz-8.onrender.com/login",
        { email, password }
      );

      if (response.data.status === "Success") {
        if (response.data.role === "admin") {
          navigate("/teacher");
        } else {
          navigate(`/`, {
            state: { email: email, password: password },
          });
        }
      }
    } catch (err) {
      setError("تأكد من اسم المستخدم و كلمة المرور");
    }
  };

  return (
    <div className="loginContainer">
      <div className="panel-lite">
        <div className="thumbur">
          <img src={picLogin} alt="Login" />
        </div>
        <h4>Login</h4>
        {error && <div className="error-message">{error}</div>}{" "}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
            <label className="form-label">البريد الالكتروني </label>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="form-label"> كلمة السر</label>
          </div>
          <Link to="/register">
            <a href="#">سجل حساب الان</a>
          </Link>
          <button className="floating-btn">
            <i className="icon-arrow" />
          </button>
        </form>
      </div>
    </div>
  );
};
