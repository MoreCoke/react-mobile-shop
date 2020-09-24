import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicPath: process.env.PUBLIC_URL,
      isNavOpen: false,
    };
  }

  toggleNav = () => {
    this.setState((prevState) => ({
      isNavOpen: !prevState.isNavOpen,
    }));
  };

  closeNav = () => {
    $("#mynav").collapse("hide");
    this.setState({ isNavOpen: false });
  };

  render() {
    const { publicPath, isNavOpen } = this.state;
    return (
      <nav className="customnav navbar-expand-lg">
        <Link className="logo text-decoration-none" to="/guest/home">
          <img src={`${publicPath}/img/logo.png`} width="100px" alt="logo" />
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
              <Link to="/guest/promotion" onClick={this.closeNav}>
                優惠活動
              </Link>
            </li>
            <li>
              <Link to="/guest/aboutus" onClick={this.closeNav}>
                關於我們
              </Link>
            </li>
            <li>
              <Link to="/guest/productlist/:brand" onClick={this.closeNav}>
                商品列表
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
