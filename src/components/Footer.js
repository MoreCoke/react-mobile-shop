import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="px-3 py-4 bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex flex-column justify-content-center h-100">
              <span className="text-white h5 text-center mb-4">
                僅用做學習，禁止任何商業用途
              </span>
              <div className="d-flex justify-content-center align=items-center">
                <a
                  href="https://github.com/MoreCoke"
                  className="mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-lg fa-github fa-2x info-link" />
                </a>
                <a
                  href="https://codepen.io/moreCoke"
                  className="mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-codepen fa-2x info-link" />
                </a>
                <Link className="mx-2" to="/admin/products">
                  <i className="fas fa-users-cog fa-2x info-link" />
                </Link>
              </div>
            </div>
          </div>
          <div className="d-none d-md-block col-md-8">
            <ul className="list-unstyled d-flex justify-content-around align-items-center info-list text-white">
              <li className="d-none d-lg-block">
                <span>全台分店</span>
                <ul className="list-unstyled">
                  <li>
                    <span href="#">台北信義店</span>
                  </li>
                  <li>
                    <span href="#">台北中山店</span>
                  </li>
                  <li>
                    <span href="#">台北西門店</span>
                  </li>
                  <li>
                    <span href="#">新北新莊店</span>
                  </li>
                </ul>
              </li>
              <li>
                <span>客服專區</span>
                <ul className="list-unstyled">
                  <li>服務電話:(02)2019-1234</li>
                  <li>服務信箱:fastservice123@gmail.com</li>
                  <li>服務時間:24小時待線</li>
                </ul>
              </li>
              <li>
                <span>網路購物政策</span>
                <ul className="list-unstyled">
                  <li>
                    <span href="#">退貨需知</span>
                  </li>
                  <li>
                    <span href="#">網路購物付款方式</span>
                  </li>
                  <li>
                    <span href="#">訂單和運送說明</span>
                  </li>
                </ul>
              </li>
              <li>
                <span>追蹤我們</span>
                <ul className="list-unstyled text-center">
                  <li>
                    <span href="#">
                      <i className="fab fa-facebook-square fa-2x" />
                    </span>
                  </li>
                  <li>
                    <span href="#">
                      <i className="fab fa-instagram fa-2x" />
                    </span>
                  </li>
                  <li>
                    <span href="#">
                      <i className="fab fa-line fa-2x" />
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
