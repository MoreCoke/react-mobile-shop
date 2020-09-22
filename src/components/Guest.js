/* eslint-disable react/no-array-index-key */
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";

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

export default function Guest({ routes }) {
  return (
    <div>
      Guest
      <ul>
        <li>
          <Link to="/guest/home">home</Link>
        </li>
        <li>
          <Link to="/guest/productlist/:brand">productlist</Link>
        </li>
        <li>
          <Link to="/guest/productdetail/:id">productdetail</Link>
        </li>
        <li>
          <Link to="/guest/productorder/:step">productorder</Link>
        </li>
        <li>
          <Link to="/guest/aboutus">aboutus</Link>
        </li>
        <li>
          <Link to="/guest/promotion">promotion</Link>
        </li>
      </ul>
      <Switch>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
    </div>
  );
}

Guest.defaultProps = {
  routes: {},
};

Guest.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      exact: PropTypes.bool,
      component: PropTypes.func,
    })
  ),
};
