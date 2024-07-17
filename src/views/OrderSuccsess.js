import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import {Button} from "react-bootstrap";

const OrderSuccess = () => {
    return (
        <>
            <TopBar />
            <div className="OrderSuccess">
                <h1>Đơn hàng của bạn đã được xác nhận!</h1>
                <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn sẽ sớm được xử lý.</p>
                <Link to="/cart">
                    <Button>Trở về giỏ hàng</Button>
                </Link>
            </div>
            <Footer />
        </>
    );
};

export default OrderSuccess;
