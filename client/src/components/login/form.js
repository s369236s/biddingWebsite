import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "./form.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      url: "http://localhost:5000/user/login",
      data: {
        email,
        password,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data === "Successfully Authenticated") {
        history.push("/home");
      }
      console.log(res.data);
    });
  };
  return (
    <form className="login-container">
      <h2>Login</h2>
      <input
        placeholder="Your Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Your Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Sign-in</button>
      <Link to="register">Sign up</Link>
    </form>
  );
};

export default LoginForm;
