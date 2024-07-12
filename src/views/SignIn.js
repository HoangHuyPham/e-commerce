import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import MyToast from "../components/MyToast";
import { ResponseStatus } from "../ResponseStatus";

function SignIn(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [dataToast, setDataToast] = useState([]);

  const handleSignInBtn = () => {
    const raw = JSON.stringify({ userName, password });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    setLoading(true);
    fetch("http://localhost:3001/api/v1/login", requestOptions)
      .then((e) => e.json())
      .then((jsonPayload) => {
        if (jsonPayload.data && jsonPayload.data.accessToken) {
          localStorage.setItem("accessToken", jsonPayload.data.accessToken);
        }

        if (jsonPayload.status === ResponseStatus.SUCCESS) {
          setTimeout(() => {
            setLoading(false);
            navigate("/home");
          }, 100);
        } else if (jsonPayload.status === ResponseStatus.FAILED) {
          setTimeout(() => {
            setLoading(false);
            setDataToast([
              {
                id: new Date().getTime(),
                show: true,
                info: "Lỗi",
                content: "Đăng nhập thất bại",
              },
            ]);
          }, 100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Loading loading={loading} />
      <MyToast data={dataToast} />
      <Form className="SignIn">
        <h1>Đăng nhập</h1>
        <Form.Group>
          <Form.Label htmlFor="inputAccount">Tài khoản</Form.Label>
          <Form.Control
            isInvalid={!userName}
            type="text"
            id="inputAccount"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Không được để trống trường này
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="inputPassword">Mật khẩu</Form.Label>
          <Form.Control
            isInvalid={!password}
            type="password"
            id="inputPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Không được để trống trường này
          </Form.Control.Feedback>
        </Form.Group>

        <div className="buttons">
          <Button variant="primary" onClick={handleSignInBtn}>
            Đăng nhập
          </Button>
          <span>Bạn chưa đăng kí?</span> <Link to="/sign/up">Đăng kí ngay</Link>
        </div>
      </Form>
    </>
  );
}

export default SignIn;
