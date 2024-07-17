import React, { useState } from "react";
import "../assets/styles/Editor.scss"
import userDefault from "../assets/images/userDefault.png"
import { Spinner } from "react-bootstrap";

function AvatarEditor({ setDataToast, updateInfo, userInfo }) {
  const [loading, setLoading] = useState(false)

  const handleImgSelect = async (e) => {
    setLoading(true)

    let fileSelect = e.target.files[0];
    if (fileSelect) {
      if (fileSelect.type !== "image/png" && fileSelect.type !== "image/jpeg") {
        setLoading(false)
        setDataToast([
          {
            id: new Date().getTime(),
            success: false,
            info: "Thất bại",
            content: "File không hợp lệ (thử lại với .png, .jpg)",
            show: true,
          },
        ]);
        return;
      }

      const formData = new FormData(document.getElementsByClassName("avatar_sender")[0]);

      fetch("http://localhost:3001/api/v1/auth/upload/avatar", {
        method: "POST",
        body: formData,
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
      }).then(
        e=> {
          updateInfo()

          setTimeout(() => {
            
            setDataToast([
              {
                id: new Date().getTime(),
                success: true,
                info: "Thành công",
                content: "Cập nhật ảnh mới thành công",
                show: true,
              },
            ]);
          }, (100));
        }
      ).catch(()=>{
        setTimeout(() => {
            
          setDataToast([
            {
              id: new Date().getTime(),
              success: false,
              info: "Thất bại",
              content: "Cập nhật ảnh mới thất bại",
              show: true,
            },
          ]);
        }, (100));
      }).finally(()=>setLoading(false));


    }
  };
  return (
    <section
      className="avatar editor"
      onClick={() =>
        document.getElementsByClassName("input_sender")[0].click()
      }
    >
      <img
        className="avatar_container"
        src={userInfo.url || userDefault}
        alt="avatar"
        loading="lazy"
      ></img>
      
      <form className="avatar_sender" encType="multipart/form-data">
        <input className="input_sender" name="image" onChange={handleImgSelect} type="file" accept=".png, .jpg" />
      </form>
      {!!loading && <div className="waiting"><Spinner variant="light"/></div>}
    </section>

    
    
  );
}

export default AvatarEditor;
