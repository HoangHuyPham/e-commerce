import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/App.scss";
import AvatarEditor from "../components/AvatarEditor";
import FormChangePassword from "../components/FormChangePassword";
import FormPersonal from "../components/FormPersonal";
import MyToast from "../components/MyToast";
import TopBar from "../components/TopBar";
import { ResponseStatus } from "../ResponseStatus";

function Info() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [dataToast, setDataToast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  useEffect(() => {updateInfo()} , []);

  const updateInfo = async() =>{
    
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
    
  }

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


  return (
    <>
      <MyToast data={dataToast}/>
      <TopBar />
      <div className="InfoPage">
      <AvatarEditor dataToast={dataToast} setDataToast={setDataToast} userInfo={userInfo} updateInfo={updateInfo} />
      {(isChangingPassword && <FormChangePassword changePasswordHandle={changePasswordHandle} isChangingPassword={isChangingPassword} setIsChangingPassword={setIsChangingPassword} userInfo={userInfo} setUserInfo={setUserInfo} loading={loading} updateHandle={updateHandle}/>)||<FormPersonal setIsChangingPassword={setIsChangingPassword} userInfo={userInfo} setUserInfo={setUserInfo} loading={loading} updateHandle={updateHandle}/>}
      
    </div>    
    </>
  );
}

export default Info;
