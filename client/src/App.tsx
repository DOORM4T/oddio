import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import "./main.scss";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/login" render={() => <div>Login</div>} />
        <Route path="/*" render={() => <div>404</div>} />
      </Switch>
    </Router>
  );
}
