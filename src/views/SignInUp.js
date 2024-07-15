import { Outlet } from "react-router-dom";
import "../assets/styles/App.scss";
import Footer from "../components/Footer";


function SignInUp(props) {

  return (
    <div className="SignInUp">

      <Outlet />
      <Footer />
    </div>
  );
}

export default SignInUp;
