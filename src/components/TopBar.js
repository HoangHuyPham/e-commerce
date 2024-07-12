import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken")) 
  const [user, setUser] = useState(null)
  

  useEffect(()=>{
    let payload = accessToken?.split(".")[1]
    if (!payload)
      return
    let decodedPayload = JSON.parse(atob(payload))
    
    setUser({
      ...decodedPayload
    })
  }, [accessToken])


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
        <span className="CartNum">0</span>
        <FontAwesomeIcon className="Fav" icon={faHeart} />
        <span className="FavNum">0</span>
      </section>
      {
        (user && (<section className="User">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {(user.firstName + " " + user.lastName).toUpperCase()}
            </Dropdown.Toggle>
  
            <Dropdown.Menu>
              <Dropdown.Item>Thông tin</Dropdown.Item>
              <Dropdown.Item>Đổi mật khẩu</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </section>)) || (<section className="Login">
          <Button className="SigninBtn" variant="primary" onClick={handleSigninBtn}>
            Đăng nhập
          </Button>
          <Button className="SignUpBtn" variant="danger" onClick={handleSignUpBtn}>
            Đăng kí
          </Button>
        </section>)
      }
      

      
    </div>
  );
}

export default TopBar;
