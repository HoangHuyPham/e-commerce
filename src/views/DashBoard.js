import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/App.scss";
import MyToast from "../components/MyToast";
import { ResponseStatus } from "../ResponseStatus";

function DashBoard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [dataToast, setDataToast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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
            navigate("/sign/in");
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
      <MyToast data={dataToast} />
      <div className="DashBoardPage">
        <div className="Left">
          <h1>Dashboard</h1>
          <hr></hr>
          <section className="ListItem">
            <ul id="myMenu">
              <li>
                <Button variant="dark">Product</Button>
              </li>
              <li>
                <Link to="#">Customer</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
