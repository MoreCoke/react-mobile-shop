/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import allRoutes from "./routes";
import style from "./App.module.scss";
import "./_customBootstrap.scss";

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
        <div className={style.App}>
          <div className="btn btn-primary">1234</div>
          <ul>
            <li>
              <Link to="/guest">guest</Link>
            </li>
            <li>
              <Link to="/admin">admin</Link>
            </li>
          </ul>
        </div>
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
