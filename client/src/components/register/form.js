import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import Axios from "axios";
import "./form.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  let history = useHistory();

  const goBack = (e) => {
    e.preventDefault();
    history.push("./");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios({
      method: "post",
      url: "http://localhost:5000/user/register",
      data: {
        email,
        username,
        password,
        conPassword,
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data === "create a new account") {
        history.push("/");
      }
    });
  };
  return (
    <form className="register-container">
      <div className="register-header">
        <h2>Register</h2>
        <ArrowLeft className="arrow-left" onClick={goBack} />
      </div>
      <input
        placeholder="Your Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Your Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Your Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="Confirm Password"
        name="Conpassword"
        value={conPassword}
        onChange={(e) => setConPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Sign-in</button>
    </form>
  );
};

export default RegisterForm;
