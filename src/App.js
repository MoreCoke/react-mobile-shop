/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import allRoutes from "./routes";

function RouteWithSubRoutes(route) {
  const { path, exact, routes } = route;
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return <route.component {...props} routes={routes} />;
      }}
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router hashType="noslash">
        <ul>
          <li>
            <Link to="/guest">guest</Link>
          </li>
          <li>
            <Link to="/admin">admin</Link>
          </li>
        </ul>
        <Switch>
          {allRoutes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Router>
    );
  }
}
export default App;
