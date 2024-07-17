import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyToast from "../components/MyToast";
import "../assets/styles/CheckoutPage.scss"

const CheckOutList = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [dataToast, setDataToast] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
        setItems(savedItems);
        calculateTotalAmount(savedItems);
    }, []);

    const calculateTotalAmount = (items) => {
        let total = 0;
        items.forEach((item) => {
            total += item.price;
        });
        setTotalAmount(total);
    };

    const handleConfirmOrder = () => {
        try {
            const orderData = {
                items: items,
                totalAmount: totalAmount,
                date: new Date().toISOString(),
            };
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            savedOrders.push(orderData);
            localStorage.setItem("orders", JSON.stringify(savedOrders));

            showToast("Đơn hàng của bạn đã được xác nhận!", "Thành công", true);
            clearCart();
        } catch (error) {
            showToast("Đã có lỗi xảy ra khi xác nhận đơn hàng.", "Lỗi", false);
            console.error("Error confirming order:", error);
        }
    };

    const clearCart = () => {
        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        const updatedCart = [...cartData];
        items.forEach((item) => {
            const indexToRemove = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
            if (indexToRemove !== -1) {
                updatedCart.splice(indexToRemove, 1);
            }
        });

        localStorage.setItem("cartData", JSON.stringify(updatedCart));
        localStorage.removeItem("checkoutItems");
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
                <Button onClick={handleConfirmOrder}>
                    Xác nhận thanh toán
                </Button>
            </div>
        </>
    );
};

export default CheckOutList;
