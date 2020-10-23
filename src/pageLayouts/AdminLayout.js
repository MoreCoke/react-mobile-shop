/* eslint-disable react/no-array-index-key */
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

export default function Admin({ routes }) {
  return (
    <div className="reactbody">
      <div className="wrapper">
        <Navbar />
        Admin
        <ul>
          <li>
            <Link to="/admin/products">products</Link>
          </li>
          <li>
            <Link to="/admin/orders">orders</Link>
          </li>
          <li>
            <Link to="/admin/coupons">coupons</Link>
          </li>
        </ul>
        <Switch>
          {routes.map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />;
          })}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

Admin.defaultProps = {
  routes: {},
};

Admin.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      exact: PropTypes.bool,
      component: PropTypes.func,
    })
  ),
};
