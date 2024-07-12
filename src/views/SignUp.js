import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import MyToast from "../components/MyToast";
import { ResponseStatus } from "../ResponseStatus";

function SignUp(props) {
  const navigate = useNavigate();
  const [signUpPayload, setSignUpPayload] = useState({
    userName: "",
    password: "",
    rePassword: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [dataToast, setDataToast] = useState([]);
  const [validationMessage, setVM] = useState("");

  const handleSignUpBtn = () => {
    const raw = JSON.stringify(signUpPayload);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    setLoading(true);
    fetch("http://localhost:3001/api/v1/signup", requestOptions)
      .then((e) => e.json())
      .then((jsonPayload) => {
        if (jsonPayload.data && jsonPayload.data.accessToken) {
          localStorage.setItem("accessToken", jsonPayload.data.accessToken);
        }

        if (jsonPayload.status === ResponseStatus.SUCCESS) {
          setTimeout(() => {
            setLoading(false);
            navigate("/sign/in");
          }, 100);
        } else if (jsonPayload.status === ResponseStatus.FAILED) {
          setTimeout(() => {
            setLoading(false);
            setDataToast([
              {
                id: new Date().getTime(),
                show: true,
                info: "Lỗi",
                content: "Đăng kí thất bại",
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
      <Form className="SignUp">
        <h1>Đăng kí</h1>
        <Form.Group>
          <Form.Label htmlFor="inputAccount">Tài khoản</Form.Label>
          <Form.Control
            isInvalid={!signUpPayload.userName}
            isValid={!!signUpPayload.userName}
            type="text"
            id="inputAccount"
            onChange={(e) =>
              setSignUpPayload({ ...signUpPayload, userName: e.target.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            Không được để trống trường này
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="inputPassword">Mật khẩu</Form.Label>
          <Form.Control
            isInvalid={!signUpPayload.password}
            isValid={
              signUpPayload.password && (signUpPayload.password === signUpPayload.rePassword)
            }
            type="password"
            id="inputPassword"
            onChange={(e) =>
              setSignUpPayload({ ...signUpPayload, password: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="inputPasswordAgain">
            Nhập lại mật khẩu
          </Form.Label>
          <Form.Control
            isInvalid={signUpPayload.password !== signUpPayload.rePassword}
            isValid={
              (signUpPayload.password === signUpPayload.rePassword)
            }
            type="password"
            id="inputPasswordAgain"
            onChange={(e) =>
              setSignUpPayload({ ...signUpPayload, rePassword: e.target.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            Mật khẩu và mật khẩu nhập lại không giống nhau
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="inputFirstName">Tên</Form.Label>
          <Form.Control
            isInvalid={!signUpPayload.firstName}
            isValid={!!signUpPayload.firstName}
            type="text"
            id="inputFirstName"
            onChange={(e) =>
              setSignUpPayload({ ...signUpPayload, firstName: e.target.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            Không được để trống trường này
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="inputLastName">Họ</Form.Label>
          <Form.Control
            isInvalid={!signUpPayload.lastName}
            isValid={!!signUpPayload.lastName}
            type="text"
            id="inputLastName"
            onChange={(e) =>
              setSignUpPayload({ ...signUpPayload, lastName: e.target.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            Không được để trống trường này
          </Form.Control.Feedback>
        </Form.Group>

        {
          //  let userName: string = req.body?.userName
          //  let password: string = req.body?.password
          //  let firstName: string = req.body?.firstName
          //  let lastName: string = req.body?.lastName
          //  let email: string = req.body?.email
          //  let address: string  = req.body?.address
          //  let phoneNumber: number = req.body?.phoneNumber
          //  let avatarLink: string = req.body?.avatarLink
          //  let isAdmin: boolean = req.body?.isAdmin
        }

        <Form.Text id="passwordHelpBlock" style={{ color: "red" }}>
          {validationMessage}
        </Form.Text>

        <div className="buttons">
          <Button variant="danger" onClick={handleSignUpBtn}>
            Đăng kí
          </Button>
          <span>Bạn đã có tài khoản?</span> <Link to="/sign/in">Đăng nhập</Link>
        </div>
      </Form>
    </>
  );
}

export default SignUp;
