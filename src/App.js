/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";

function Guest({ routes }) {
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
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}

function Login() {
  return <div>Login</div>;
}

function Home() {
  return <div>Home</div>;
}

function ProductList() {
  return <div>ProductList</div>;
}

function ProductDetail() {
  return <div>ProductDetail</div>;
}

function ProductOrder() {
  return <div>ProductOrder</div>;
}

function AboutUs() {
  return <div>aboutUs</div>;
}

function Promotion() {
  return <div>promotion</div>;
}

function Products() {
  return <div>products</div>;
}

function Orders() {
  return <div>orders</div>;
}

function Coupons() {
  return <div>coupons</div>;
}

function Admin({ routes }) {
  return (
    <div>
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
  );
}

const allRoutes = [
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/guest",
    component: Guest,
    routes: [
      {
        path: "/guest/home",
        exact: true,
        component: Home,
      },
      {
        path: "/guest/productlist/:brand",
        exact: true,
        component: ProductList,
      },
      {
        path: "/guest/productdetail/:id",
        exact: true,
        component: ProductDetail,
      },
      {
        path: "/guest/productorder/:step",
        exact: true,
        component: ProductOrder,
      },
      {
        path: "/guest/aboutus",
        exact: true,
        component: AboutUs,
      },
      {
        path: "/guest/promotion",
        exact: true,
        component: Promotion,
      },
    ],
  },
  {
    path: "/admin",
    component: Admin,
    routes: [
      {
        path: "/admin/products",
        exact: true,
        component: Products,
      },
      {
        path: "/admin/orders",
        exact: true,
        component: Orders,
      },
      {
        path: "/admin/coupons",
        exact: true,
        component: Coupons,
      },
    ],
  },
];

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
        <div className="App">
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
