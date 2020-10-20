import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import ShoppingCart from "./ShoppingCart";

const brandList = [
  {
    path: "全部品牌",
    name: "全部品牌",
  },
  {
    path: "apple",
    name: "Apple",
  },
  {
    path: "pixel",
    name: "Pixel",
  },
  {
    path: "samsung",
    name: "Samsung",
  },
  {
    path: "huawei",
    name: "Huawei",
  },
  {
    path: "oppo",
    name: "Oppo",
  },
  {
    path: "sony",
    name: "Sony",
  },
  {
    path: "xiaomi",
    name: "小米",
  },
  {
    path: "asus",
    name: "ASUS",
  },
];

const productType = ["全部商品", "手機", "手錶", "耳機"];

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageProducts: [],
      linkParams: {
        brand: this.props.match.params.brand,
        type: this.props.match.params.type,
      },
      pagination: {
        current_page: null,
        total_pages: null,
        has_pre: null,
        has_next: null,
      },
    };
    this.products = [];
    this.pageMaxCard = 9;
  }

  // 取得所有資料
  // 抓出所選資料
  // 從中 slice 出頁面資料
  async componentDidMount() {
    await this.getAllProducts().then(() => {
      this.getCurrentPageProducts();
    });
  }

  componentDidUpdate() {
    const {
      linkParams: { brand: oldBrand, type: oldType },
    } = this.state;
    const {
      match: {
        params: { brand: newBrand, type: newType },
      },
    } = this.props;
    if (oldBrand !== newBrand || oldType !== newType) {
      this.setState({ linkParams: { brand: newBrand, type: newType } }, () =>
        this.getCurrentPageProducts()
      );
    }
  }

  productPath = (linkBrand, linkType) => {
    const {
      linkParams: { brand, type },
    } = this.state;
    if (!linkBrand) {
      return `/guest/productlist/${brand}/${linkType}`;
    }
    if (!linkType) {
      return `/guest/productlist/${linkBrand}/全部商品`;
    }
    return `/guest/productlist/${brand}/${type}`;
  };

  classifyType = (unit) => {
    let type = unit;
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

  getAllProducts = () => {
    const url = `${process.env.REACT_APP_APIPATH}api/${process.env.REACT_APP_CUSTOMPATH}/products/all`;
    return fetch(url)
      .then((res) => res.json())
      .then((response) => {
        this.products = response.products;
      });
  };

  getCurrentPageProducts = () => {
    const {
      linkParams: { brand, type },
    } = this.state;
    let targetProduct;
    if (brand === "全部品牌" && type === "全部商品") {
      targetProduct = [...this.products];
    } else if (brand === "全部品牌") {
      targetProduct = this.products.filter(
        (element) => this.classifyType(element.unit) === type
      );
    } else if (type === "全部商品" || !type) {
      targetProduct = this.products.filter(
        (element) => element.category === brand
      );
    } else {
      targetProduct = this.products.filter(
        (element) =>
          element.category === brand && this.classifyType(element.unit) === type
      );
    }

    this.setState({ currentPageProducts: targetProduct });
  };

  render() {
    const {
      currentPageProducts,
      linkParams: { brand },
    } = this.state;
    return (
      <div className="mt-3">
        <div className="vld-parent" />
        <ShoppingCart />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="list-group custom-sticky product-sidebar mb-3">
                {brandList.map(({ path, name }) => (
                  <NavLink
                    to={this.productPath(path, null)}
                    className="list-group-item"
                    activeClassName="active"
                    key={path}
                    isActive={() => path === brand}
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="col-md-9 h-100">
              <div className="product-bar">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  {productType.map((element) => (
                    <li className="nav-item" key={element}>
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to={this.productPath(null, element)}
                      >
                        {element}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="row">
                {currentPageProducts.map((element) => (
                  <div className="col-sm-4" key={element.title}>
                    <ProductCard card={element} />
                  </div>
                ))}
              </div>
              {currentPageProducts.length === 0 && (
                <div className="noproduct mb-3">
                  <i className="far fa-2x fa-dizzy mb-3" />
                  目前沒有相關商品!!
                </div>
              )}
              {/* <Pagination :prop-page="pagination" @pageData="productsPagination" v-if="!showNoProduct" /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductList.defaultProps = {
  match: {},
};

ProductList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      brand: PropTypes.string,
      type: PropTypes.string,
    }),
  }),
};
