import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Flash from "./flash";
import Axios from "axios";
import "./form.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flashs, setFlashs] = useState([]);
  let value = 0;
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios({
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
      setFlashs([...res.data]);
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
      {flashs.map((flash) => (
        <Flash key={value++} msg={flash.msg} />
      ))}
    </form>
  );
};

export default LoginForm;
