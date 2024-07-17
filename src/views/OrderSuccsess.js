import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";

const OrderSuccess = () => {
    return (
        <>
            <TopBar />
            <div className="OrderSuccess">
                <h2>Đơn hàng của bạn đã được xác nhận thành công!</h2>
                <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
                <Link to="/">Quay lại trang chủ</Link>
            </div>
            <Footer />
        </>
    );
};

export default OrderSuccess;
