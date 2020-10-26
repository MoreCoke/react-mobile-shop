/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";

import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Autoplay, Pagination]);

const swiperOption = {
  loop: true,
  pagination: {
    clickable: true,
  },
  autoplay: {
    disableOnInteraction: false,
  },
};

const swiperData = [
  {
    imgpath: {
      backgroundImage:
        "url(https://images.unsplash.com/photo-1543409743-b5ed0eb0c5b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)",
    },
    title: "OPPO R17",
    text: "夜的美比白天溫柔，全面升級超有感。",
  },
  {
    imgpath: {
      backgroundImage:
        "url(https://images.unsplash.com/photo-1551355738-1875b6664915?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225&q=80)",
    },
    title: "Google Pixel 3",
    text: "全新Google智慧助理隨你差遣。",
  },
  {
    imgpath: {
      backgroundImage:
        "url(https://images.unsplash.com/photo-1570976278927-39de20093775?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)",
    },
    title: "iPhone 11 Pro",
    text: "相機、顯示器、效能，一切如Pro其名。",
  },
  {
    imgpath: {
      backgroundImage:
        "url(https://images.unsplash.com/photo-1551261752-c4d1f4faa041?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)",
    },
    title: "Samsung Galaxy S10",
    text: "123度超廣角鏡頭，突破視野極限。",
  },
];

const otherbgc = [
  {
    img: "6.jpg",
    title: "優惠折扣",
    text: "玩小遊戲抽折扣!",
    routerPath: "/guest/promotion",
  },
  {
    img: "iPhone-11-Pro.jpg",
  },
];

const serviceItem = [
  {
    img: "3.jpg",
    title: "3C手機",
    text: "款式多樣，應有盡有。",
    typeIndex: 1,
    typeName: "手機",
  },
  {
    img: "2.jpg",
    title: "智慧手錶",
    text: "紀錄健康動起來!",
    typeIndex: 2,
    typeName: "手錶",
  },
  {
    img: "1.jpg",
    title: "無線藍芽耳機",
    text: "輕便小巧，簡單生活。",
    typeIndex: 3,
    typeName: "耳機",
  },
  {
    img: "7.jpg",
    title: "所有商品",
    text: "種類豐富，應有盡有!",
    typeIndex: 0,
    typeName: "全部商品",
  },
];

const newProduct = [
  {
    name: "iPhone 11 Pro",
    text: "後置三鏡頭 | 5.8 吋 OLED",
    routerpath: "/guest/productdetail/-LseWhNSDZAaoE-L2VqN",
    img: "iphone11pro.jpg",
    logo: "apple.svg",
  },
  {
    name: "Sony Xperia 5 ",
    text: "眼控對焦 | 八核心處理",
    routerpath: "/guest/productdetail/-LrnKPvMhdwPiRhofsjQ",
    img: "xperia-5-primary.png",
    logo: "sony.svg",
  },
  {
    name: "Samsung Galaxy Note 10 Plus",
    text: "八核心處理器 | O 極限螢幕",
    routerpath: "/guest/productdetail/-Lse_PHBDKpMPI5kunSH",
    img: "samsung_galaxy_note10_plus.jpg",
    logo: "samsung.svg",
  },
];

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      random: [],
    };
    this.publicPath = process.env.PUBLIC_URL;
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts = () => {
    const url = `${process.env.REACT_APP_APIPATH}/api/${process.env.REACT_APP_CUSTOMPATH}/products/all`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => this.getRandomProduct(...response.products));
  };

  getRandomProduct = (...data) => {
    const len = data.length;
    const random = [];
    while (random.length < 9) {
      const r = Math.floor(Math.random() * len);
      if (random.indexOf(data[r]) === -1 && data[r].unit === "台") {
        random.push(data[r]);
      }
    }
    this.setState({ random });
  };

  compileImgPath = (path) => {
    return { backgroundImage: `url(${this.publicPath}/img/${path})` };
  };

  serviceItemPath = (type) => {
    return `/guest/productlist/全部品牌/${type}`;
  };

  render() {
    const { random } = this.state;
    return (
      <div>
        <Swiper {...swiperOption}>
          {swiperData.map((element, index) => (
            <SwiperSlide
              className="bg-cover carousel-height"
              style={element.imgpath}
              key={`swiper-${index}`}
            >
              <div className="ad-news justify-content-center justify-content-md-end align-items-start">
                <div className="frosted-zone">
                  <div className="frosted-zone-inner">
                    <h2 className="headtitle mb-2">{element.title}</h2>
                    <h5 className="subtitle">{element.text}</h5>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination" slot="pagination" />
        </Swiper>
        <section className="py-1 container-fluid">
          <Link className="service" to={otherbgc[0].routerPath}>
            <div
              className="service-discount bg-cover"
              style={this.compileImgPath(otherbgc[0].img)}
            >
              <div className="service-textzone">
                <h4 className="service-title">{otherbgc[0].title}</h4>
                <h5 className="service-subtitle">{otherbgc[0].text}</h5>
              </div>
            </div>
          </Link>
          {serviceItem.map((element, index) => (
            <Link
              className="service"
              to={this.serviceItemPath(element.typeName)}
              key={`product-${index}`}
            >
              <div
                className="service-item bg-cover"
                style={this.compileImgPath(element.img)}
              >
                <div className="service-textzone">
                  <h4 className="service-title">{element.title}</h4>
                  <h5 className="service-subtitle">{element.text}</h5>
                </div>
              </div>
            </Link>
          ))}
        </section>
        <section
          className="bg-cover p-5 iphone-bgc"
          style={this.compileImgPath(otherbgc[1].img)}
        >
          <div className="text-right">
            <div className="headtitle text-white">為你而活，非你莫屬</div>
            <div className="subtitle text-white">
              邀您一同共享跨世代的喜悅。
            </div>
          </div>
        </section>
        <section className="container-fluid mb-8">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="topic">最新商品</div>
              <div className="row">
                {newProduct.map((element, index) => (
                  <div className="col-md-4" key={`newProduct-${index}`}>
                    <Link
                      className="text-decoration-none"
                      to={element.routerpath}
                    >
                      <div className="ad-card">
                        <div className="ad-outline">
                          <div
                            className="ad-brand"
                            style={this.compileImgPath(element.logo)}
                          />
                          <div
                            className="ad-img"
                            style={this.compileImgPath(element.img)}
                          />
                        </div>
                        <div className="ad-textzone">
                          <div className="ad-title">{element.name}</div>
                          <div className="ad-text">{element.text}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-success">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-5">
                <div className="topic">汰舊換新</div>
                <div className="row">
                  {random.map((element, index) => (
                    <div className="col-4" key={`renew-${index}`}>
                      <Link
                        className="renew-product bg-cover"
                        to={`/guest/productdetail/${element.id}`}
                        style={{ backgroundImage: `url(${element.imgUrl})` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="renew">
                  <div className="renew-imgzone">
                    <div className="renew-img bg-cover" />
                  </div>
                </div>
                <div className="topic">這裡總有款適合您的手機!</div>
              </div>
            </div>
          </div>
        </section>
        <section className="p-4">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <img
                  className="renew-imgcenter"
                  src={`${this.publicPath}/img/hweil_p30pro.png`}
                  alt="hweil_p30pro"
                />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="py-5 renew-textzone">
                      <i className="fas fa-3x fa-user-md text-success" />
                      <h3>現場評估</h3>
                      <p>由我們專業人員評估您的舊手機使用狀態計算折舊。</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="py-5 renew-textzone">
                      <i className="fas fa-3x fa-hand-holding-usd text-success" />
                      <h3>現金折扣</h3>
                      <p>舊手機型號越新，折抵越高，最高可享$12,000!</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="py-5 renew-textzone">
                      <i className="fas fa-3x fa-diagnoses text-success" />
                      <h3>款式多樣</h3>
                      <p>安卓、蘋果手機通通都有，任君挑選!</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="py-5 renew-textzone">
                      <i className="fas fa-3x fa-child text-success" />
                      <h3>回收舊機</h3>
                      <p>
                        我們會幫您的舊手機找到新的主人,或是送回原廠分解零件，環保利用!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
