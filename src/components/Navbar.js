import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
  }

  toggleNav = () => {
    this.setState((prevState) => ({
      isNavOpen: !prevState.isNavOpen,
    }));
  };

  render() {
    const { isNavOpen } = this.state;
    return (
      <nav className="customnav navbar-expand-lg">
        <Link className="logo" to="/guest/home">
          {/* <img src="`${publicPath}img/logo.png`" width="100px" alt /> */}
          速達通訊
        </Link>
        <button
          className="navbar-toggler ml-auto"
          data-target="#mynav"
          data-toggle="collapse"
          type="button"
          onClick={this.toggleNav}
        >
          <div className={`animated-icon ${isNavOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </button>
        <div className="collapse navbar-collapse" id="mynav">
          <ul className="customnav-group">
            <li>
              <Link to="/guest/promotion">優惠活動</Link>
            </li>
            <li>
              <Link to="/guest/aboutus">關於我們</Link>
            </li>
            <li>
              <Link to="/guest/productlist/:brand">商品列表</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
