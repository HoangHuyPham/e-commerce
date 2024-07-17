import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../components/TopBar";
import MyToast from "../components/MyToast";
import Footer from "../components/Footer";
import "../assets/styles/CheckoutPage.scss"

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const items = location.state?.items || [];
    const [dataToast, setDataToast] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        calculateTotalAmount();
    }, [items]);

    const calculateTotalAmount = () => {
        let total = 0;
        items.forEach((item) => {
            total += item.price;
        });
        setTotalAmount(total);
    };

    const handleConfirmOrder = () => {
        setTimeout(() => {
            showToast("Đơn hàng của bạn đã được xác nhận!", "Thành công", true);
            clearCart();
        }, 1000);
    };

    const clearCart = () => {
        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        const updatedCart = cartData.filter(
            (cartItem) => !items.some((item) => item.id === cartItem.id)
        );

        localStorage.setItem("cartData", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
        navigate("/order-success");
    };

    const showToast = (content, info, success) => {
        setDataToast([
            {
                id: new Date().getTime(),
                success: success,
                show: true,
                info: info,
                content: content,
            },
        ]);
    };

    return (
        <>
            <TopBar />
            <MyToast data={dataToast} />
            <div className="CheckoutPage">
                <span className="Title">Xác nhận đơn hàng</span>
                <span className="TotalAmount" style={{ marginLeft: "auto" }}>
                    Tổng tiền: {totalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </span>
                <div className="Content">
                    {items.map((item, i) => (
                        <Card key={i}>
                            <Card.Img variant="top" src={item.link} className="img-fluid" />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <Button className="mt-3" onClick={handleConfirmOrder}>
                    Xác nhận thanh toán
                </Button>
            </div>
            <Footer />
        </>
    );
};

export default CheckoutPage;
