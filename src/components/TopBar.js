import React, { Component } from "react";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

class TopBar extends Component {
  render() {
    return (
      <div className="TopBar">
        <img src={logo} alt="logo" />
        <section className="SearchBar">
          <input
            className="SearchInput"
            placeholder="Nhập sản phẩm bạn muốn tìm"
          />
          <button className="SearchBtn">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </section>

        <section className="Misc">
          <FontAwesomeIcon className="Cart" icon={faCartShopping} />
          <FontAwesomeIcon className="Fav" icon={faHeart} />
        </section>

        <section className="Login">
          <Button className="SigninBtn" variant="primary">
            Đăng nhập
          </Button>
          <Button className="SignOutBtn" variant="danger">
            Đăng kí
          </Button>
        </section>

      </div>
    );
  }
}

export default TopBar;
