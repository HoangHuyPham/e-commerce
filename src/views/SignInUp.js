import { Outlet } from "react-router-dom";
import "../assets/styles/App.scss";
import Footer from "../components/Footer";
import { Button, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";


function SignInUp(props) {

  return (
    <div className="SignInUp">

      <Outlet />
      <Footer />
    </div>
  );
}

export default SignInUp;
