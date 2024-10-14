import axios from "axios";
import React, { useState } from "react";
import '../styles/Modal.css'
import { Link, useNavigate } from "react-router-dom";

export const Modal = ({toggle}) => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://mern-stack-quiz-api2.vercel.app/addTeacher", { name, email, password })
      .then((res) => navigate("/login"))
      .catch((err) => alert(err));
  };


  const handleToggle=()=>{
    //setToggle(!toggle)
  }

  return (









    <div>
































     {/* <div className="containerModal">

  <div className="popup" >  


    <div className="popup-inner" >
   
      <div className="popup__text">

      </div>
      <a className="popup__close" href="#">
        X
      </a>
    </div>
  </div>
</div> */}




















{/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required="required"
        />

        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required="required"
        />
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required="required"
        />

        <button className="floating-btn">
          <i className="icon-arrow" />
        </button>
      </form> */}









    </div>
  );
};
