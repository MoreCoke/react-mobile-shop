/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { Link } from "react-router-dom";

const coupons = [
  {
    title: "95折折價券",
    code: "iloveflash",
  },
  {
    title: "8折折價券",
    code: "bhgynbmvgt",
  },
  {
    title: "85折折價券",
    code: "jkughjukj",
  },
  {
    title: "9折折價券",
    code: "asdfedfrgd",
  },
];

export default class Promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomCards: [],
      randomCoupon: {},
      isGameOver: false,
    };
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts = () => {
    const url = `${process.env.REACT_APP_APIPATH}api/${process.env.REACT_APP_CUSTOMPATH}/products/all`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        this.getRandom(...response.products);
      });
    // const vm = this;
    // vm.$store.commit("LOADING", true);
    // vm.$http.get(url).then((response) => {
    //   vm.$store.commit("LOADING", false);
    //   vm.getRandom(...response.data.products);
    // });
  };

  getRandom = (...data) => {
    const len = data.length;
    const newData = data.map((item) => {
      const obj = {};
      obj.title = item.title;
      obj.imgUrl = item.imgUrl;
      obj.flipped = false;
      obj.found = false;
      return obj;
    });
    const arr = [];
    while (arr.length < 6) {
      const r = Math.floor(Math.random() * len);
      if (arr.indexOf(newData[r]) === -1) {
        arr.push(newData[r]);
      }
    }
    this.createRandomCard(arr);
  };

  createRandomCard = (arr) => {
    const len = arr.length;
    let randomCards = [];
    while (randomCards.length < 6) {
      const r = Math.floor(Math.random() * len);
      if (randomCards.indexOf(arr[r]) === -1) {
        randomCards.push(arr[r]);
      }
    }
    const newRandomCards = JSON.parse(JSON.stringify(randomCards));
    randomCards = randomCards.concat(newRandomCards);
    randomCards = this.shuffleRandomCards(randomCards);
    randomCards = randomCards.map((element, index) => {
      element.id = index;
      return element;
    });
    this.setState({ randomCards });
  };

  shuffleRandomCards = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  flippedCard = (card) => {
    const { randomCards } = this.state;
    const flippedLen = randomCards.filter((flipcard) => flipcard.flipped)
      .length;
    if (!card.flipped || !card.found) {
      this.setState(
        (prevState) => {
          const randomArr = prevState.randomCards.map((element) =>
            card.id === element.id ? { ...element, flipped: true } : element
          );
          return { randomCards: randomArr };
        },
        () => {
          if (flippedLen === 1) {
            this.checkSameCards();
          }
        }
      );
    }
  };

  checkSameCards = () => {
    const { randomCards } = this.state;
    const flippedCards = randomCards.filter((card) => card.flipped);
    if (flippedCards[0].title === flippedCards[1].title) {
      this.setState(
        (prevState) => {
          const randomArr = prevState.randomCards.map((element) =>
            flippedCards[0].id === element.id ||
            flippedCards[1].id === element.id
              ? { ...element, found: true }
              : element
          );
          return { randomCards: randomArr };
        },
        () => {
          this.checkFoundCards();
        }
      );
    }
    setTimeout(() => {
      this.setState((prevState) => {
        const randomArr = prevState.randomCards.map((element) =>
          flippedCards[0].id === element.id || flippedCards[1].id === element.id
            ? { ...element, flipped: false }
            : element
        );
        return { randomCards: randomArr };
      });
    }, 1000);
  };

  checkFoundCards = () => {
    const { randomCards } = this.state;
    const allCardsLen = randomCards.length;
    const foundCardsLen = randomCards.filter((card) => card.found).length;
    if (allCardsLen === foundCardsLen) {
      this.getRandomCoupon();
    }
  };

  getRandomCoupon = () => {
    const r = Math.floor(Math.random() * coupons.length);
    this.setState({ randomCoupon: coupons[r] });
    setTimeout(() => {
      this.gameOver();
    }, 2000);
  };

  gameOver = () => {
    const { randomCoupon } = this.state;
    this.setState({ isGameOver: true });
    localStorage.setItem("coupon", JSON.stringify(randomCoupon));
  };

  render() {
    const { isGameOver, randomCards, randomCoupon } = this.state;
    return (
      <div className="container">
        <div className="vld-parent" />
        <div
          className={`endgame justify-content-center align-items-center ${
            isGameOver ? "d-flex" : "d-none"
          }`}
        >
          <div className="endgame-news">
            <div className="endgame-content">
              <div className="endgame-text">
                結束遊戲!
                <br />
                <span>恭喜你獲得</span>
                <br />
                <span className="coupon-name">{randomCoupon.title}</span>
                <Link to="/guest/productlist/全部品牌">
                  <button className="btn btn-info btn-block mt-4" type="button">
                    購物去
                    <i className="fas fa-shopping-basket ml-3" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="topic">優惠小遊戲</div>

        <div className="rule-text">
          <p>
            遊戲規則:
            <br />
            點選配對相同的卡片，完成遊戲後隨機發送
            <br />
            折扣碼並將該折扣送至結帳頁面，輸入折扣
            <br />
            碼就能使用啦!
          </p>
        </div>
        <div className="row my-4">
          {randomCards.map((element, index) => (
            <div className="col-6 col-md-3" key={`random-${index}`}>
              <div className="d-flex justify-content-center">
                <div
                  className={`playcard ${element.flipped ? "flipped" : ""} ${
                    element.found ? "found" : ""
                  }`}
                  role="button"
                  tabIndex="0"
                  onClick={() => this.flippedCard(element)}
                >
                  <div className="back" />
                  <div
                    className="front"
                    style={{ backgroundImage: `url(${element.imgUrl})` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
