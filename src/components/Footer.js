import React, { Component } from "react";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <section className="FirstLine">
          <section className="Info">
            Đồng hồ chính hãng - nơi chúng tôi tự hào giới thiệu những chiếc
            đồng hồ chất lượng cao. Chúng tôi cam kết cung cấp cho bạn những sản
            phẩm độc đáo, tinh xảo và đáng tin cậy từ những thương hiệu nổi
            tiếng trên toàn thế giới.
          </section>
          <section className="Support">
            Hỗ trợ khách hàng
            <ul>
              <li><span>099699669</span></li>
              <li><span>21130385@st.hcmuaf.edu.vn</span></li>
            </ul>
          </section>
          <section className="Util">Tiện ích</section>
        </section>

        <section className="SecondLine">
          <section className="FollowUs">
            Theo dõi chúng tôi
            <section className="Social">
              <a href="https://github.com/HoangHuyPham/e-commerce">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://github.com/HoangHuyPham/e-commerce">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://github.com/HoangHuyPham/e-commerce">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </section>
          </section>
        </section>
      </div>
    );
  }
}

export default Footer;
