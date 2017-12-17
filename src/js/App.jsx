import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Search from "./Search";
import Details from "./Details";

const FourOhFour = () => <h1>404</h1>;

const App = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/items" component={Search} />
    <Route path="/items/:id" component={Details} />
    <Route component={FourOhFour} />
  </Switch>
);

export default App;
