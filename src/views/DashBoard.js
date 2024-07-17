import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import {
  faCaretLeft, faTable,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "../assets/styles/App.scss";
import MyToast from "../components/MyToast";
import { ResponseStatus } from "../ResponseStatus";
import NotFound from "./NotFound";

function DashBoard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [dataToast, setDataToast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectTab, setSelectTab] = useState("products"); // users || orders
  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    updateInfo();
  }, []);


  const updateInfo = async () => {
    try {
      fetch("http://localhost:3001/api/v1/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((e) => e.json())
        .then((data) => {
          if (
            data.status === ResponseStatus.EXPIRED_TOKEN ||
            data.status === ResponseStatus.UNAUTHORIZED
          ) {
            navigate("sign/in");
            return;
          }
          setUserInfo(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
      navigate("/sign/in");
    }
  };

  return (
    <>
      {((userInfo?.isAdmin) && (<><MyToast data={dataToast} />
      <div className="DashBoardPage">
        <div className="Left">
          <h1>Dashboard</h1>
          <hr></hr>
          <section className="ListItem">
            <ul className="Menu">
              <li>
                <Button
                  className={selectTab === "products" && "bluesky"}
                  onClick={(e) => navigate("products")}
                >
                  <FontAwesomeIcon icon={faProductHunt} />
                  <span>Products</span>
                </Button>
              </li>
              <li>
                <Button
                  className={selectTab === "users" && "bluesky"}
                  onClick={(e) => navigate("users")}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Users</span>
                </Button>
              </li>
              <li>
                <Button
                  className={selectTab === "orders" && "bluesky"}
                  onClick={(e) => navigate("orders")}
                >
                  <FontAwesomeIcon icon={faTable} />
                  <span>Orders</span>
                </Button>
              </li>
              <li>
                <Button
                  onClick={(e) => navigate("/home")}
                >
                  <FontAwesomeIcon icon={faCaretLeft} />
                  <span>Home</span>
                </Button>
              </li>
            </ul>
          </section>
        </div>

        <div className="Right">
          <Outlet/>
        </div>
      </div></>)) || <NotFound title={"Bạn không có quyền truy cập trang này"}/>}
      
    </>
  );
}

export default DashBoard;
