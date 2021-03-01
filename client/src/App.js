import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/login/loginpage";
import Register from "./pages/register/registerpage";
import HomePage from "./pages/home/homepage";
import Room from "./pages/room/room";
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
      </Switch>
    </div>
  );
}

export default App;
