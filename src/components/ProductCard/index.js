/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProductCard extends Component {
  constructor() {
    super();
    this.publicPath = process.env.PUBLIC_URL;
  }

  compileBrandImg = (brand) => {
    return {
      backgroundImage: `url(${this.publicPath}/img/${brand}.svg)`,
    };
  };

  classifyType = (unit) => {
    let type;
    switch (unit) {
      case "台":
        type = "手機";
        break;
      case "支":
        type = "手錶";
        break;
      case "組":
        type = "耳機";
        break;
      default:
        break;
    }
    return type;
  };

  currency = (price) => {
    const n = Number(price);
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency =
        i && c !== "." && (a.length - i) % 3 === 0
          ? `, ${c}`.replace(/\s/g, "")
          : c;
      return currency;
    })}`;
  };

  productDetailPath = (id) => {
    return `/guest/productdetail/${id}`;
  };

  render() {
    const { card } = this.props;
    return (
      <div className="product-card">
        <div
          className="product-brand bg-cover"
          style={this.compileBrandImg(card.category)}
        />
        <Link to={this.productDetailPath(card.id)}>
          <div
            className="product-img"
            style={{ backgroundImage: `url(${card.imgUrl})` }}
          />
        </Link>
        <div className="product-title">
          {card.title}
          <div className="product-type">{this.classifyType(card.unit)}</div>
        </div>
        <div className="product-textzone">
          <div>
            <small>原價 : </small>
            <span className="price-origin">
              {this.currency(card.origin_price)}
            </span>
          </div>
          <div className="price-sale">
            <small>特價 : </small>
            {this.currency(card.price)}
          </div>
        </div>
        <Link
          className="product-btn btn-primary"
          to={this.productDetailPath(card.id)}
        >
          瞭解更多
        </Link>
      </div>
    );
  }
}
