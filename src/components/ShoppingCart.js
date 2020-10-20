import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: {},
      cartProductsNum: null,
      isShowCartList: false,
      effect: {
        isLoading: false,
        currentLoading: "",
      },
    };
  }

  async componentDidMount() {
    await this.getCartData();
  }

  getCartData = () => {
    const url = `${process.env.REACT_APP_APIPATH}api/${process.env.REACT_APP_CUSTOMPATH}/cart`;
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          cartProducts: response.data,
          cartProductsNum: response.data.carts.length,
        });
        console.log("cardProduct", this.state.cartProducts);
      });
  };

  delCartData = (id) => {
    const url = `${process.env.REACT_APP_APIPATH}api/${process.env.REACT_APP_CUSTOMPATH}/cart/${id}`;
    this.setState((prevState) => ({
      effect: {
        ...prevState.effect,
        currentLoading: id,
      },
    }));
    fetch(url, { method: "DELETE" })
      .then((res) => res.json())
      .then((response) => {
        this.getCartData();
        this.setState((prevState) => ({
          effect: {
            ...prevState.effect,
            currentLoading: "",
          },
        }));
        // this.$store.dispatch("updateMessage", {
        //   message: response.data.message,
        //   status: "warning",
        // });
        // this.$emit("delcart");
      });
  };

  toOrderCheck = () => {
    if (this.cartProductsNum > 0) {
      this.$router.push("/guest/productorder/check");
    }
  };

  toggleShowCartList = () => {
    this.setState((prevState) => ({
      isShowCartList: !prevState.isShowCartList,
    }));
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
  //   addCart() {
  //     this.getCartData();
  //   }
  // },

  render() {
    const {
      isShowCartList,
      cartProducts,
      cartProductsNum,
      effect,
    } = this.state;
    return (
      <div className="dropdown shopping-cart shopping-right">
        <button
          className="shopping-btn"
          onClick={this.toggleShowCartList}
          type="button"
        >
          <i className="fas fa-shopping-cart fa-3x" />
          <span className="badge badge-pill badge-danger">
            {cartProductsNum}
          </span>
        </button>
        <div className={`dropdown-menu ${isShowCartList && "show"}`}>
          <div className="p-3">
            <h5 className="font-weight-bold">購物清單</h5>
            <div className="shopping-scroll my-3">
              <table className="table">
                <thead>
                  <tr>
                    <th />
                    <th>購買明細</th>
                    <th>價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>目前尚無選購商品!</td>
                    <td />
                    <td />
                  </tr>
                  {cartProducts.carts &&
                    cartProducts.carts.map((element, index) => (
                      <tr key={`cart-${index}`}>
                        <td>
                          <Link
                            className="shopping-img"
                            to={`/guest/productdetail/${element.product.id}`}
                            style={{
                              backgroundImage: `url(${element.product.imgUrl})`,
                            }}
                          />
                        </td>
                        <td>
                          <h4 className="mb-2">{element.product.title}</h4>
                          <p>
                            共{element.qty}
                            {element.product.unit}
                          </p>
                        </td>
                        <td>
                          <p>{this.currency(element.final_total)}</p>
                          <button
                            className="mt-3 btn btn-outline-info"
                            onClick={() => this.delCartData(element.id)}
                            type="button"
                          >
                            {element.id === effect.currentLoading ? (
                              <i className="fas fa-spinner fa-spin" />
                            ) : (
                              <i className="fas fa-trash-alt" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="shopping-total">
              總計金額: {this.currency(cartProducts.total)}
            </div>
            <Link to="/guest/productorder/check">
              <button
                className="btn btn-primary btn-block"
                disabled={cartProductsNum === 0}
                type="button"
              >
                <i className="fas fa-shopping-cart mr-2" />
                結帳去
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
