import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function FormChangePassword({
  isChangingPassword,
  userInfo,
  changePasswordHandle,
  loading,
  updateHandle,
  setIsChangingPassword,
}) {
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();

  

  return (
    <section className="form">
      <Form.Group>
        <InputGroup>
          <InputGroup.Text>Tên đăng nhập</InputGroup.Text>
          <Form.Control
            isInvalid={!userInfo.userName}
            placeholder="Tên đăng nhập"
            value={userInfo.userName}
            readOnly
          />
        </InputGroup>

        <InputGroup>
          <Form.Control
            type="password"
            placeholder="Mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Form.Control
            isInvalid={!password}
            isValid={!!password}
            type="password"
            placeholder="Mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Không được để trống trường này
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup>
          <Form.Control
            isInvalid={password !== rePassword}
            isValid={password === rePassword}
            type="password"
            placeholder="Nhập lại Mật khẩu mới"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Mật khẩu và mật khẩu nhập lại không giống nhau
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup className="options">
          <Button
            disabled={loading}
            onClick={!loading ? ()=>setIsChangingPassword(false) : null}
            ncl
            variant="primary"
          >
            {loading
              ? "..."
              : isChangingPassword
              ? "Sửa thông tin"
              : "Đổi mật khẩu"}
          </Button>
          <Button
            disabled={loading}
            onClick={!loading ? ()=>changePasswordHandle(userInfo.userName, oldPassword, password) : null}
            variant="success"
          >
            {loading ? "..." : "Cập nhật"}
          </Button>
        </InputGroup>
      </Form.Group>
    </section>
  );
}

export default FormChangePassword;
