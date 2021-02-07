import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>
        <Switch>
        <Router path="/" exact>
            inicio ...
          </Router>
          <Router path="/login">
            <Login></Login>
          </Router>
          <Router path="/admin">
            admin ...
          </Router>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
