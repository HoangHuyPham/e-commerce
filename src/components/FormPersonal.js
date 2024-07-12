import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function FormPersonal({userInfo, setUserInfo, loading, updateHandle, setIsChangingPassword}){

    return (
        <section className="form">
        <Form.Group>
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              isInvalid={!userInfo.lastName}
              placeholder="Họ"
              value={userInfo.lastName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastName: e.target.value })
              }
            />
            <Form.Control
              isInvalid={!userInfo.firstName}
              placeholder="Tên"
              value={userInfo.firstName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Không được để trống trường này
            </Form.Control.Feedback>
          </InputGroup>

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
              type="email"
              placeholder="Email (Tùy chọn)"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup>
            <Form.Control
              type="number"
              placeholder="Số điện thoại (Tùy chọn)"
              value={userInfo.phoneNumber}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phoneNumber: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup>
            <Form.Control
              placeholder="Địa chỉ (Tùy chọn)"
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup className="options">
            <Button disabled={loading} onClick={!loading?()=>setIsChangingPassword(true):null} variant="primary">{loading?"...":"Đổi mật khẩu"}</Button>
            <Button disabled={loading} onClick={!loading?updateHandle:null} variant="success">{loading?"...":"Cập nhật"}</Button>
          </InputGroup>
        </Form.Group>
      </section>
    );
  
}

export default FormPersonal;
