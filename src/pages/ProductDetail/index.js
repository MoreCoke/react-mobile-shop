/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../../components/ShoppingCart";
import ProductCard from "../../components/ProductCard";

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      random: [],
      cartProducts: {},
      cartProductsNum: null,
      qty: 1,
      effect: {
        currentLoading: "",
      },
    };
    this.publicPath = process.env.PUBLIC_URL;
  }

  async componentDidMount() {
    await this.getProductDetail();
    await this.getCartData();
  }

  getProductDetail = () => {
    const { id } = this.props.match.params;
    const url = `${process.env.REACT_APP_APIPATH}/api/${process.env.REACT_APP_CUSTOMPATH}/product/${id}`;
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (!response.success) {
          console.log("Failed!!");
          return;
        }
        this.setState({ product: response.product });
      })
      .then(() => this.getRandomProduct());
  };

  getRandomProduct = () => {
    const url = `${process.env.REACT_APP_APIPATH}/api/${process.env.REACT_APP_CUSTOMPATH}/products/all`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        const { products } = response;
        const len = products.length;
        const randomArr = [];
        while (randomArr.length < 3) {
          const r = Math.floor(Math.random() * len);
          if (
            randomArr.indexOf(products[r]) === -1 &&
            this.state.product.id !== products[r].id
          ) {
            randomArr.push(products[r]);
          }
        }
        this.setState({ random: randomArr });
      });
  };

  compileBrandImg = () => {
    return {
      backgroundImage: `url(${this.publicPath}/img/${this.state.product.category}.svg)`,
    };
  };

  compileProductImg = () => {
    return { backgroundImage: `url(${this.state.product.imgUrl})` };
  };

  productCategoryPath = (category) => {
    return `/guest/productlist/${category}/全部商品`;
  };

  regexpSetting = (text) => {
    return text
      .replace(/(.{1,}\n\b)/g, "<span class='description-title'>$1</span>")
      .replace(/\n/g, "<br>");
  };

  getCartData = () => {
    const url = `${process.env.REACT_APP_APIPATH}/api/${process.env.REACT_APP_CUSTOMPATH}/cart`;
    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        this.setState({
          cartProducts: response.data,
          cartProductsNum: response.data.carts.length,
        });
      });
  };

  addToCart = (id, qty) => {
    const url = `${process.env.REACT_APP_APIPATH}/api/${process.env.REACT_APP_CUSTOMPATH}/cart`;
    if (qty > 3) {
      qty = 3;
      // vm.$store.dispatch("updateMessage", { message: "每款商品限購3個", status: "warning" });
    }
    const cart = {
      product_id: id,
      qty,
    };
    this.setState({ effect: { currentLoading: id } });
    fetch(url, {
      method: "POST",
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
      .then((response) => {
        this.getCartData();
        this.setState({
          effect: {
            currentLoading: "",
          },
        });
        // vm.$store.dispatch("updateMessage", { message: response.data.message, status: "success" });
      });
  };

  delCartData = (id, showmessage) => {
    const url = `${process.env.REACT_APP_APIPATH}/api/${process.env.REACT_APP_CUSTOMPATH}/cart/${id}`;
    this.setState({ effect: { currentLoading: id } });
    fetch(url, { method: "DELETE" })
      .then((res) => res.json())
      .then((response) => {
        this.getCartData();
        this.setState({ effect: { currentLoading: "" } });
        if (showmessage) {
          // vm.$store.dispatch("updateMessage", { message: response.data.message, status: "warning" });
        }
      });
  };

  checkCart = (id, qty) => {
    let sameProductNum = qty;
    const sameProduct = this.state.cartProducts.carts.find(
      (element) => element.product.id === id
    );

    if (typeof sameProduct !== "undefined") {
      sameProductNum += sameProduct.qty;
      if (sameProductNum > 3) {
        sameProductNum = 3;
        // vm.$store.dispatch("updateMessage", { message: "每款商品限購3個", status: "warning" });
      } else {
        this.delCartData(sameProduct.id, false);
        this.addToCart(id, sameProductNum);
      }
    } else {
      this.addToCart(id, qty);
    }
  };

  toOrderCheck = () => {
    if (this.state.cartProductsNum > 0) {
      // this.$router.push("/guest/productorder/check");
    }
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

  // watch: {
  //   $route() {
  //     this.getProductDetail();
  //   }
  // },
  // render() {
  //   return <div>123</div>;
  // }
  render() {
    const {
      cartProductsNum,
      product,
      qty,
      effect,
      cartProducts,
      random,
    } = this.state;
    return (
      <div className="container-fluid my-4">
        <div className="vld-parent" />
        <ShoppingCart className="shopping-left" addCart={cartProductsNum} />
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div
              className="detail-img bg-cover"
              style={this.compileProductImg()}
            />
          </div>
          <div className="col-md-8">
            <div className="row mb-4">
              <div className="col-lg-8">
                <div className="detail-title mb-3">
                  <Link
                    className="detail-brand mr-3"
                    to={this.productCategoryPath(product.category)}
                    style={this.compileBrandImg()}
                  />
                  <span>{product.title}</span>
                </div>
                <div className="detail-badge badge-primary p-2 mb-3">
                  <i className="fas fa-thumbs-up" />
                  商品特色
                </div>
                {product.content && (
                  <p
                    className="detail-content mb-3"
                    dangerouslySetInnerHTML={{
                      __html: this.regexpSetting(product.content),
                    }}
                  />
                )}
                <p className="detail-sale mb-3">
                  特價: {this.currency(product.price)}
                  <span>原價: {this.currency(product.origin_price)}</span>
                </p>
                <div className="d-flex align-items-start align-items-md-center">
                  <div className="d-flex flex-column flex-md-row">
                    <div className="cart-group mr-3 mb-2 mb-md-0">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState((prevState) => ({
                            qty: prevState.qty - 1,
                          }));
                        }}
                        className={qty < 2 ? "cart-disable" : ""}
                      >
                        <i className="fas fa-minus" />
                      </a>
                      <input type="number" min="1" max="3" defaultValue={qty} />
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState((prevState) => ({
                            qty: prevState.qty + 1,
                          }));
                        }}
                        className={qty > 2 ? "cart-disable" : ""}
                      >
                        <i className="fas fa-plus" />
                      </a>
                    </div>
                    {qty < 4 ? (
                      <span className="detail-current-price mr-3">
                        目前金額: {this.currency(product.price * qty)}
                      </span>
                    ) : (
                      <span className="detail-current-price mr-3">
                        單次消費限購3台!
                      </span>
                    )}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.checkCart(product.id, qty)}
                    disabled={product.id === effect.currentLoading}
                    type="button"
                  >
                    {product.id === effect.currentLoading ? (
                      <i className="fas fa-spinner fa-spin" />
                    ) : (
                      <i className="fas fa-shopping-cart pr-2" />
                    )}
                    加入購物車
                  </button>
                </div>
              </div>
              <div className="col-lg-4 d-none d-lg-block">
                <h4 className="cart-title">
                  <i className="fas fa-gift mr-2" />
                  購物清單
                </h4>
                <ul className="cart-list">
                  <li>
                    {cartProducts.carts && cartProducts.carts.length === 0 && (
                      <div className="cart-nothing">尚無商品</div>
                    )}
                  </li>
                  {cartProducts.carts &&
                    cartProducts.carts.map((element, index) => (
                      <li key={`cart-${index}`}>
                        <div className="cart-listitem">
                          <div className="d-flex mb-3 mb-xl-0">
                            <Link
                              className="listitem-img mr-2"
                              to={`/guest/productdetail/${element.product.id}`}
                              style={{
                                backgroundImage: `url(${element.product.imgUrl})`,
                              }}
                              title={element.product.title}
                            />
                            <div className="mr-2">
                              <h4 className="listitem-title mb-2">
                                {element.product.title}
                              </h4>
                              <p className="listitem-info">
                                {this.currency(element.product.price)} 共
                                {element.qty}
                                {element.product.unit}
                              </p>
                            </div>
                          </div>
                          <div className="w-100 d-flex justify-content-end align-items-center">
                            <span className="listitem-total mr-3">
                              {this.currency(element.total)}
                            </span>
                            <button
                              className="btn btn-outline-info"
                              onClick={() => this.delCartData(element.id, true)}
                              disabled={element.id === effect.currentLoading}
                              type="button"
                            >
                              {element.id === effect.currentLoading ? (
                                <i className="fas fa-spinner fa-spin" />
                              ) : (
                                <i className="fas fa-trash-alt" />
                              )}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="cart-total">
                  <span className="mr-2">
                    總計金額:{this.currency(cartProducts.total)}
                  </span>
                  <button
                    className="btn btn-info mt-3 mt-xl-0"
                    disabled={cartProductsNum === 0}
                    onClick={this.toOrderCheck}
                    type="button"
                  >
                    <i className="fas fa-cash-register mr-2" />
                    結帳去
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="topic mb-5">商品描述</div>
          {product.description && (
            <p
              className="detail-content"
              dangerouslySetInnerHTML={{
                __html: this.regexpSetting(product.description),
              }}
            />
          )}
          <div className="topic mb-5">其他熱門商品</div>
          <div className="row">
            {random.map((element, index) => (
              <div className="col-sm-4" key={`random-${index}`}>
                <ProductCard card={element} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
