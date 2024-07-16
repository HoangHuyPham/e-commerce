// src/components/FavoriteWatches.js

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import MyToast from "../components/MyToast";
import Footer from "../components/Footer";

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

    const handleAddToCart = () => {
        // Add to cart logic here
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
            <TopBar />
            <MyToast data={dataToast} />
            <div className="WatchList">
                <div className="FavoriteWatches">
                    <span className="Title">Sản phẩm yêu thích</span>
                    <div className="Content">
                        {favoriteData.map((v, i) => (
                            <Card key={i}>
                                <Card.Img onClick={() => handleWatchDetail(v)} variant="top" src={v.url} />
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
                                    <Button variant="primary" onClick={handleAddToCart}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleRemoveFromFav(v)}>
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
            <Footer />
        </>
    );
};

export default FavoriteWatches;
