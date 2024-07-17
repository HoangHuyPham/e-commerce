import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Cart.scss"

const OrderSuccess = () => {
    return (
        <>
            <div className="OrderSuccess">
                <h2>Đơn hàng của bạn đã được xác nhận thành công!</h2>
                <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
                <Link to="/">Quay lại trang chủ</Link>
            </div>
        </>
    );
};

export default OrderSuccess;
