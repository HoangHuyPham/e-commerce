// src/components/FavoriteWatches.js

import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faHeart,
    faMinus
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import TopBar from "../components/TopBar";
import MyToast from "../components/MyToast";
import Footer from "../components/Footer";

class FavoriteWatches extends Component {
    state = {
        favoriteData: JSON.parse(localStorage.getItem("favoriteData")) || [],
        dataToast: [],
    };

    handleAddToCart = () => {

    }

    handleRemoveFromFav = (watch) => {
        const { favoriteData } = this.state;
        const updatedFavorites = favoriteData.filter((item) => item.id !== watch.id);
        this.setState({ favoriteData: updatedFavorites });
        localStorage.setItem("favoriteData", JSON.stringify(updatedFavorites));
        window.dispatchEvent(new Event('favoritesUpdated'));
        this.showToast(`${watch.name} đã bị xóa khỏi mục yêu thích.`, "Thành công", true);
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
        const { favoriteData } = this.state;
        return (
            <>
                <TopBar />
                <MyToast data={this.state.dataToast} />
                <div className="WatchList">
                    <div className="FavoriteWatches">
                        <span className="Title">Sản phẩm yêu thích</span>
                        <div className="Content">
                            {favoriteData.map((v, i) => (
                                <Card key={i}>
                                    <Link to={`/watch/${v.id}`}>
                                        <Card.Img variant="top" src={v.url} />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>{v.name}</Card.Title>
                                        <Card.Text style={{ color: 'black' }}>{v.detail}</Card.Text>
                                        <Card.Text>
                                            {v.price.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="primary" onClick={this.handleAddToCart}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                        <Button variant="danger" onClick={() => this.handleRemoveFromFav(v)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </Button>
                                        <Button className="BuyBtn" variant="warning">
                                            Mua ngay
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default FavoriteWatches;
