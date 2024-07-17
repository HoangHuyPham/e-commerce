// src/components/FavoriteWatches.js

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faShoppingCart, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import MyToast from "../components/MyToast";
import Footer from "../components/Footer";
import { addToCart } from "../components/addToCart";

const FavoriteWatches = () => {
    const [favoriteData, setFavoriteData] = useState(JSON.parse(localStorage.getItem("favoriteData")) || []);
    const [dataToast, setDataToast] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleFavoritesUpdated = () => {
            setFavoriteData(JSON.parse(localStorage.getItem("favoriteData")) || []);
        };

        window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

        return () => {
            window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
        };
    }, []);

    const handleWatchDetail = (watch) => {
        navigate(`/watch-detail/${watch.id}`, { state: { watch } });
    };

    const handleAddToCart = (watch) => {
        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        const updatedCart = [...cartData, watch];
        localStorage.setItem("cartData", JSON.stringify(updatedCart));
        showToast(`${watch.name} đã được thêm vào giỏ hàng!`, "Thành công", true);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleBuyNow = (watch) => {
        localStorage.removeItem('checkoutItem')
        localStorage.setItem('checkoutItem', JSON.stringify(watch));
        navigate('/buynow');
        //buynow();
    };

    const handleRemoveFromFav = (watch) => {
        const updatedFavorites = favoriteData.filter((item) => item.id !== watch.id);
        setFavoriteData(updatedFavorites);
        localStorage.setItem("favoriteData", JSON.stringify(updatedFavorites));
        window.dispatchEvent(new Event('favoritesUpdated'));
        showToast(`${watch.name} đã bị xóa khỏi mục yêu thích.`, "Thành công", true);
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
            <div className="WatchList">
                    <span className="TitleDetail">Sản phẩm yêu thích</span>
                    <div className="Content">
                        {favoriteData.map((v, i) => (
                            <Card key={i}>
                                <div onClick={() => handleWatchDetail(v)} className="card-img-container">
                                    <Card.Img className="card-img" variant="top" src={v.preview.url}/>
                                </div>
                                <Card.Body>
                                    <Card.Title>{v.name}</Card.Title>
                                    <Card.Text style={{color: 'black'}}>{v.detail}</Card.Text>
                                    <Card.Text>
                                        {v.price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary" onClick={()=>handleAddToCart(v)}>
                                        <FontAwesomeIcon icon={faShoppingCart}/>
                                    </Button>
                                    <Button variant="danger" onClick={() => handleRemoveFromFav(v)}>
                                        <FontAwesomeIcon icon={faMinus}/>
                                    </Button>
                                    <Button onClick={()=>handleBuyNow(v)} className="BuyBtn" variant="warning">
                                        Mua ngay
                                    </Button>
                                </Card.Footer>
                            </Card>
                        ))}
                    </div>
            </div>

        </>
    );
};

export default FavoriteWatches;
