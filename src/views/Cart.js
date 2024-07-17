import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import MyToast from "../components/MyToast";
import Footer from "../components/Footer";

const Cart = () => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem("cartData")) || []);
    const [dataToast, setDataToast] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        calculateTotalAmount();
    }, [cartData]);

    const handleRemoveFromCart = (watch) => {
        const updatedCart = cartData.filter((item) => item.id !== watch.id);
        const removedItem = cartData.find((item) => item.id === watch.id);
        const priceToRemove = removedItem ? removedItem.price : 0;
        const newTotal = totalAmount - priceToRemove;

        setCartData(updatedCart);
        setTotalAmount(newTotal);
        localStorage.setItem("cartData", JSON.stringify(updatedCart));
        showToast(`${watch.name} đã bị xóa khỏi giỏ hàng.`, "Thành công", true);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleCheckout = (items) => {
        if (items.length === 0) {
            setShowAlert(true);
        } else {
            console.log("Navigating to /thanhtoan with items:", items); // Log to check data
            navigate("/thanhtoan", { state: { items } });
        }
    };

    const calculateTotalAmount = () => {
        let total = 0;
        cartData.forEach((item) => {
            total += item.price;
        });
        setTotalAmount(total);
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
            <div className="Cart">
                <span className="Title">Giỏ hàng của bạn</span>
                <span className="TotalAmount" style={{ marginLeft: "auto" }}>
                    Tổng tiền: {totalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </span>
                <div className="Content">
                    {cartData.map((item, i) => (
                        <Card key={i}>
                            <Link to={`/watch/${item.id}`}>
                                <Card.Img variant="top" src={item.link} className="img-fluid" />
                            </Link>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="danger" onClick={() => handleRemoveFromCart(item)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <Button className="BuyBtn" variant="warning" onClick={() => handleCheckout([item])}>
                                    Mua ngay
                                </Button>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            </div>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    Bạn cần ít nhất một sản phẩm để thanh toán!
                </Alert>
            )}
            <Button className="mt-3" onClick={() => handleCheckout(cartData)}>
                Thanh toán
            </Button>
            <Footer />
        </>
    );
};

export default Cart;
