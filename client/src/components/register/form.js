import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import Flash from "../flash/flash";
import Axios from "axios";
import "./form.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [years, setYears] = useState([]);
  const [days, setDays] = useState([]);
  const [flashs, setFlashs] = useState([]);
  let value = 0;
  useEffect(() => {
    const year_ = new Date().getFullYear();
    setYear(year_);
    setMonth("1");
    setDay("1");
    setYears(Array.from(new Array(year_ - 1900), (_, index) => year_ - index));
    setDays(Array.from(new Array(31), (_, index) => index + 1));
    return () => {
      console.log("cleaned up");
    };
  }, []);

  let history = useHistory();
  const goBack = (e) => {
    e.preventDefault();
    history.push("./");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Axios({
      method: "post",
      url: "http://localhost:5000/user/register",
      data: {
        email,
        username,
        password,
        conPassword,
        year,
        month,
        day,
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data === "create a new account") {
        history.push("/");
      }
      setFlashs([...res.data]);
      console.log(flashs);
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
      <div className="register-input-container">
        <p className="infoName">出生日期</p>
        <div>
          <select
            value={year}
            name="year"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            name="month"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          >
            <option value="1">1月</option>
            <option value="2">2月</option>
            <option value="3">3月</option>
            <option value="4">4月</option>
            <option value="5">5月</option>
            <option value="6">6月</option>
            <option value="7">7月</option>
            <option value="8">8月</option>
            <option value="9">9月</option>
            <option value="10">10月</option>
            <option value="11">11月</option>
            <option value="12">12月</option>
          </select>
          <select
            name="day"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
            }}
          >
            {days.map((day, index) => (
              <option key={index} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
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
      {flashs.map((flash) => (
        <Flash key={value++} msg={flash.msg} />
      ))}
    </form>
  );
};

export default RegisterForm;
