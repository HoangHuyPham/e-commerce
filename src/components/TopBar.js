import {
  faCartShopping,
  faHeart, faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

function TopBar() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))
  const [user, setUser] = useState(null)
  const [favCount, setFavCount] = useState(0);


  useEffect(()=>{
    let payload = accessToken?.split(".")[1]
    if (!payload)
      return
    let decodedPayload = JSON.parse(atob(payload))

    setUser({
      ...decodedPayload
    })
  }, [accessToken])

  useEffect(() => {
    const updateFavCount = () => {
      const favoriteData = JSON.parse(localStorage.getItem("favoriteData")) || [];
      setFavCount(favoriteData.length);
    };

    // Update favCount on component mount and when favoritesUpdated event is dispatched
    updateFavCount();
    window.addEventListener("favoritesUpdated", updateFavCount);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("favoritesUpdated", updateFavCount);
    };
  }, []);

  const handleSigninBtn = () => {
    navigate("/sign/in");
  };

  const handleSignUpBtn = () => {
    navigate("/sign/up");
  };

  const handleSignOut = () => {
    setUser(null)
    localStorage.removeItem("accessToken")
    navigate()
  }

  const handleFavListBtn = () => {
    if (user==null) {
      navigate("/sign/in");
    } else {
      navigate("/favorites"); }
  }

  const handleHome = () => {
    navigate("/home");
  }

  return (
      <div className="TopBar">
        <img src={logo} alt="logo" onClick={handleHome} />
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
          <span className="CartNum">0</span>
          <FontAwesomeIcon className="Fav" icon={faHeart} onClick={handleFavListBtn}/>
          <span className="FavNum">{favCount}</span>
        </section>
        {(user && (
        <section className="User">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">

              {(!!user.firstName && !!user.lastName) && (user.firstName + " " + user.lastName).toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>navigate("/home")}>Trang chủ</Dropdown.Item>
              {user.isAdmin && <Dropdown.Item onClick={()=>navigate("/dashboard")}>Dashboard</Dropdown.Item>}
              <Dropdown.Item onClick={()=>navigate("/info/me")}>Thông tin</Dropdown.Item>
              <Dropdown.Item onClick={()=>navigate("/info/me")}>Đổi mật khẩu</Dropdown.Item>
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
