import React, { Component } from "react";
import Mainpage from "./Components/Mainpage/mainpage.component";
import Fullsearch from "./Components/Fullsearch/fullsearch.component";
import { history } from "./helpers/history";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
      <div>
      <Router history={history}>
        <Switch>
        <Route exact path={["/", "/home"]} component={Mainpage} />
        <Route exact path={"/more"} component={Fullsearch}/>
        </Switch>
        </Router>
      </div>
  );
}

export default App;
