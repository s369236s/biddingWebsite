import React, { useRef } from "react";
import Cropper from "react-cropper";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/login/loginpage";
import Register from "./pages/register/registerpage";
import HomePage from "./pages/home/homepage";
import Room from "./pages/room/room";
import UserProfilePage from "./pages/userprofile/userProfilePage";

import CreateNewMerch from "./pages/cretemerch/createmerchpage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/Register" component={Register} />
        <Route path="/Home" component={HomePage} />
        <Route exact path="/CreateNewMerch" component={CreateNewMerch} />
        <Route exact path="/Room" component={Room} />
        <Route exact path="/user" component={UserProfilePage} />
      </Switch>
    </div>
  );
}

export default App;
