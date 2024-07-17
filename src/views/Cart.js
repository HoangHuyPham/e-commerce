import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import MyToast from "../components/MyToast";
import Footer from "../components/Footer";

class Cart extends Component {
    state = {
        cartData: JSON.parse(localStorage.getItem("cartData")) || [],
        dataToast: [],
        totalAmount: 0,
        showAlert: false,
    };

    componentDidMount() {
        this.calculateTotalAmount();
    }

    handleRemoveFromCart = (watch) => {
        const { cartData } = this.state;
        const updatedCart = cartData.filter((item) => item.id !== watch.id);
        const removedItem = cartData.find((item) => item.id === watch.id);
        const priceToRemove = removedItem ? removedItem.price : 0;
        const newTotal = this.state.totalAmount - priceToRemove;

        this.setState({ cartData: updatedCart, totalAmount: newTotal });
        localStorage.setItem("cartData", JSON.stringify(updatedCart));
        this.showToast(`${watch.name} đã bị xóa khỏi giỏ hàng.`, "Thành công", true);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    handleCheckout = () => {
        const { cartData } = this.state;
        if (cartData.length === 0) {
            this.setState({ showAlert: true });
        } else {
            //this.props.history.push("/checkout");
        }
    };


    calculateTotalAmount = () => {
        const { cartData } = this.state;
        let total = 0;
        cartData.forEach((item) => {
            total += item.price;
        });
        this.setState({ totalAmount: total });
    };

    showToast = (content, info, success) => {
        this.setState({
            dataToast: [
                {
                    id: new Date().getTime(),
                    success: success,
                    show: true,
                    info: info,
                    content: content,
                },
            ],
        });
    };

    render() {
        const { cartData, totalAmount, showAlert } = this.state;
        return (
            <>
                <TopBar />
                <MyToast data={this.state.dataToast} />
                <div className="Cart">
                    <span className="Title">Giỏ hàng của bạn</span>
                    <span className="TotalAmount"  style={{ marginLeft: "auto" }}>
                        Tổng tiền: {totalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                    </span>
                    <div className="Content">
                        {cartData.map((item, i) => (
                            <Card key={i}>
                                <Link to={`/watch/${item.id}`}>
                                    <Card.Img variant="top" src={item.link} className="img-fluid"/>
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
                                    <Button variant="danger" onClick={() => this.handleRemoveFromCart(item)}>
                                        <FontAwesomeIcon icon={faMinus}/>
                                    </Button>
                                    <Button className="BuyBtn" variant="warning">
                                        Mua ngay
                                    </Button>
                                </Card.Footer>
                            </Card>
                        ))}
                    </div>
                </div>
                {showAlert && (
                    <Alert variant="danger" onClose={() => this.setState({ showAlert: false })} dismissible>
                        Bạn cần ít nhất một sản phẩm để thanh toán!
                    </Alert>
                )}
                <Button className="mt-3" onClick={this.handleCheckout}>
                    Thanh toán
                </Button>
                <Footer/>
            </>
        );
    }
}

export default Cart;
