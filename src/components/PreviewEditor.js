import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "../assets/styles/Editor.scss";

function PreviewEditor({ data, setPreviewHandle, setDataToast }) {
  const [id, setId] = useState(data?.id);
  const [url, setURL] = useState(data?.src);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    setId(data?.id);
    setURL(data?.src);
  }, [data]);

  const handleImgSelect = (e) => {
    let fileSelect = e.target.files[0];
    setLoading(true)
    try {
      if (fileSelect) {
        if (
          fileSelect.type !== "image/png" &&
          fileSelect.type !== "image/jpeg"
        ) {
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

        const formData = new FormData(document.getElementById(`form-${id}`));

        fetch(`http://localhost:3001/api/v1/auth/upload/preview/${id}`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((e) => e.json())
          .then((e) => {
            setTimeout(() => {
              if (setPreviewHandle)
                setPreviewHandle(id, {url: e.data.url, idPreview: e.data.id});
              
              setDataToast([
                {
                  id: new Date().getTime(),
                  success: true,
                  info: "Thành công",
                  content: "Cập nhật ảnh mới thành công",
                  show: true,
                },
              ]);
            }, 100);
            return e.data.url
          }).then((url)=>{setURL(url)})
          .catch((err) => {
            setTimeout(() => {
              setDataToast([
                {
                  id: new Date().getTime(),
                  success: false,
                  info: "Thất bại",
                  content: "Lỗi không xác định",
                  show: true,
                },
              ]);
            }, 100);
          }).finally(()=>{
            setLoading(false)
          });
      }
    } catch (err) {
      setTimeout(() => {
        setDataToast([
          {
            id: new Date().getTime(),
            success: false,
            info: "Thất bại",
            content: "Lỗi không xác định",
            show: true,
          },
        ]);
      }, 100);
    }
  };
  return (
    <section
      className="preview editor"
      onClick={() => document.getElementById(`${id}`).click()}
    >
      {isLoading && <Spinner/>}
      <img
        className="preview_container"
        src={url}
        alt="preview"
        loading="lazy"
      ></img>
      <form
        id={`form-${id}`}
        className="preview_sender"
        encType="multipart/form-data"
      >
        <input
          id={id}
          className="input_sender"
          name="image"
          onChange={handleImgSelect}
          type="file"
          accept=".png, .jpg"
        />
      </form>
    </section>
  );
}

export default PreviewEditor;
