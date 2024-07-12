import { Button, Form, InputGroup } from "react-bootstrap";
import "../assets/styles/App.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResponseStatus } from "../ResponseStatus";
import MyToast from "../components/MyToast";
import TopBar from "../components/TopBar";
import FormPersonal from "../components/FormPersonal";
import FormChangePassword from "../components/FormChangePassword";

function Info() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [dataToast, setDataToast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  useEffect(() => {
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

          setUserInfo(data.data || {});
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
      navigate("/sign/in");
    }
  }, []);


  const changePasswordHandle = async (userName, oldPassword, newPassword) => {
    try {
      console.log(userName, oldPassword, newPassword)
      if (!newPassword){
        setDataToast([{
              id: new Date().getTime(),
              success: false,
              info: "Thất bại",
              content: "Không được tạo mật khẩu trống",
              show: true
            }])
          return
      }
      setLoading(true)
      await setTimeout(() => {
        fetch("http://localhost:3001/api/v1/auth/me/change_password", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-type": "application/json"
          },
          body: JSON.stringify({userName, oldPassword, newPassword})
        })
          .then((e) => e.json())
          .then((data) => {
            if (
              data.status === ResponseStatus.FAILED ||
              data.status === ResponseStatus.UNAUTHORIZED
            ) {
              setLoading(false)
              return;
            }
            setLoading(false)
            setDataToast([{
              id: new Date().getTime(),
              success: true,
              info: "Thành công",
              content: "Cập nhật thành công",
              show: true
            }])
            localStorage.removeItem("accessToken")
            setTimeout(() => {
              navigate("/sign/in")
            }, 1000);
          })
          .catch((err) => {
            setLoading(false)
            console.log(err);
          });
      }, 2000);
      
    } catch (error) {
      console.error(error);
      navigate("/sign/in");
    } 

    
  }
  const updateHandle = async () => {
    try {
      setLoading(true)
      await setTimeout(() => {
        fetch("http://localhost:3001/api/v1/auth/me", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-type": "application/json"
          },
          body: JSON.stringify({...userInfo, createdAt: undefined, updatedAt: undefined})
        })
          .then((e) => e.json())
          .then((data) => {
            if (
              data.status === ResponseStatus.FAILED ||
              data.status === ResponseStatus.UNAUTHORIZED
            ) {
              setLoading(false)
              return;
            }
            setLoading(false)
            setDataToast([{
              id: new Date().getTime(),
              success: true,
              info: "Thành công",
              content: "Cập nhật thành công",
              show: true
            }])
          })
          .catch((err) => {
            setLoading(false)
            console.log(err);
          });
      }, 2000);
      
    } catch (error) {
      console.error(error);
      navigate("/sign/in");
    } 

    
  }

  const avatarHandle = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      var file = e.target.files[0];
      console.log(file);
    };
  };

  return (
    <>
      <MyToast data={dataToast}/>
      <TopBar />
      <div className="InfoPage">
      {console.log("render")}
      <section className="avatar" onClick={avatarHandle}>
        <img
          width="150"
          height="150"
          className="avatar"
          src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-1/131373127_1971557266352370_44313375092480653_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=BrgrQqICxJcQ7kNvgEgE4ZO&_nc_ht=scontent.fsgn5-14.fna&oh=00_AYCGgC5CCpXS9M4XAy8k57XzoEzcLNX6qq7_DM7qkfKcSw&oe=66967A67"
          alt="avatar"
          loading="lazy"
        ></img>
      </section>
      {(isChangingPassword && <FormChangePassword changePasswordHandle={changePasswordHandle} isChangingPassword={isChangingPassword} setIsChangingPassword={setIsChangingPassword} userInfo={userInfo} setUserInfo={setUserInfo} loading={loading} updateHandle={updateHandle}/>)||<FormPersonal setIsChangingPassword={setIsChangingPassword} userInfo={userInfo} setUserInfo={setUserInfo} loading={loading} updateHandle={updateHandle}/>}
      
    </div>    
    </>
  );
}

export default Info;
