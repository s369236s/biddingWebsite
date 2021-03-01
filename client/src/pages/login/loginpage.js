import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginForm from "../../components/login/form";
import Axios from "axios";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
