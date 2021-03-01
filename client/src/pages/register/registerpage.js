import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import RegisterForm from "../../components/register/form";
import Axios from "axios";

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
