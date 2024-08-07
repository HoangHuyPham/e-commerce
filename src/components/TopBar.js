import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AppContext } from "../stores/contexts/AppContext";

function TopBar() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(null);
  const [favCount, setFavCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const [data, setData] = useContext(AppContext);


  useEffect(() => {
    let payload = accessToken?.split(".")[1];
    if (!payload) return;
    let decodedPayload = JSON.parse(atob(payload));

    setUser({
      ...decodedPayload,
    });
  }, [accessToken]);

  useEffect(() => {
    const updateFavCount = () => {
      const favoriteData =
        JSON.parse(localStorage.getItem("favoriteData")) || [];
      setFavCount(favoriteData.length);
    };
    const updateCartItems = () => {
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      setCartCount(cartData.length);
    };

    // Update favCount on component mount and when favoritesUpdated event is dispatched
    updateFavCount();
    window.addEventListener("favoritesUpdated", updateFavCount);

    updateCartItems();
    window.addEventListener("cartUpdated", updateCartItems);

    return () => {
      window.removeEventListener("favoritesUpdated", updateFavCount);
      window.removeEventListener("cartUpdated", updateCartItems);
    };
  }, []);

  const handleSigninBtn = () => {
    navigate("/sign/in");
  };

  const handleSignUpBtn = () => {
    navigate("/sign/up");
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    navigate();
  };

  const handleFavListBtn = () => {
    if (user == null) {
      navigate("/sign/in");
    } else {
      navigate("/favorites");
    }
  };

  const handleAddToCart = () => {
    if (user==null) {
      navigate("/sign/in");
    } else {
      navigate("/cart"); }
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (

    <div className="TopBar">
      <img
        src={logo}
        alt="logo"
        style={{ height: "100%", width: "auto" }}
        onClick={handleHome}
      />
      <section className="SearchBar">
        <input
          onChange={(e) => setData({...data, keyword: e.target.value})}
          className="SearchInput"
          placeholder="Nhập sản phẩm bạn muốn tìm"
        />
        <button
          className="SearchBtn"
          onClick={() => {
            if (data.updateSearch){
              data.updateSearch()
            }
            navigate("/search");
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </section>

      <section className="Misc">
        <FontAwesomeIcon onClick={handleAddToCart} className="Cart" icon={faCartShopping} />
        <span className="CartNum">{cartCount}</span>
        <FontAwesomeIcon
          className="Fav"
          icon={faHeart}
          onClick={handleFavListBtn}
        />
        <span className="FavNum">{favCount}</span>
      </section>
      {(user && (
        <section className="User">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {!!user.firstName &&
                !!user.lastName &&
                (user.firstName + " " + user.lastName).toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/home")}>
                Trang chủ
              </Dropdown.Item>
              {user.isAdmin && (
                <Dropdown.Item onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => navigate("/info/me")}>
                Thông tin
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/info/me")}>
                Đổi mật khẩu
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </section>
      )) || (
        <section className="Login">
          <Button
            className="SigninBtn"
            variant="primary"
            onClick={handleSigninBtn}
          >
            Đăng nhập
          </Button>
          <Button
            className="SignUpBtn"
            variant="danger"
            onClick={handleSignUpBtn}
          >
            Đăng kí
          </Button>
        </section>
      )}
    </div>
  );
}

export default TopBar;
