import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function MyToast({data}) {
  const [toast, setToast] = useState(data);

  useEffect(()=>{
    setToast(data)
  }, [data])

  const handleCloseToast = (id) => {
    setToast(toast.map(toast => (toast.id === id ? { ...toast, show: false } : toast)));
  };

  return (
    <ToastContainer className="ToastContainer">
      {
        toast && toast.length > 0 && toast.map((v)=>(<Toast key={v.id} bg="dark" onClose={() => handleCloseToast(v.id)} show={v.show} delay={3000} autohide>
        <Toast.Header bg="dark">
          <FontAwesomeIcon style={{color: "red"}} icon={faXmarkCircle}/>
          <strong className="me-auto">{v.info}</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body className="text-white">
          {v.content}
        </Toast.Body>
      </Toast>))
      }
    </ToastContainer>
  );
}

export default MyToast;
