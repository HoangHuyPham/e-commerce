import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import "../assets/styles/WatchDetail.scss";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function WatchDetail({ data }) {
    const { id } = useParams();
    const [watch, setWatch] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (data && data.length > 0) {
            const foundWatch = data.find((item) => item.id === parseInt(id));
            if (foundWatch) {
                setWatch(foundWatch);
            } else {
                setWatch(null);
            }
        }
    }, [data, id]);

    const addToFavorites = (watch) => {
        const favoriteData = JSON.parse(localStorage.getItem("favoriteData")) || [];
        const updatedFavorites = [...favoriteData, watch];
        localStorage.setItem("favoriteData", JSON.stringify(updatedFavorites));
        toast.success(`${watch.name} đã được thêm vào danh sách yêu thích!`);
        setIsFavorite(true);
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    const removeFromFavorites = (watch) => {
        const favoriteData = JSON.parse(localStorage.getItem("favoriteData")) || [];
        const updatedFavorites = favoriteData.filter((item) => item.id !== watch.id);
        localStorage.setItem("favoriteData", JSON.stringify(updatedFavorites));
        toast.success(`${watch.name} đã được xóa khỏi danh sách yêu thích!`);
        setIsFavorite(false);
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    if (!watch) {
        return <div>Đồng hồ không tồn tại</div>;
    }

    return (
        <>
            <TopBar />
            <div className="watch-detail-container">
                <div className="watch-detail">
                    <div className="watch-detail-left">
                        <img src={watch.link} alt={watch.name} />
                    </div>
                    <div className="watch-detail-center">
                        <h1>{watch.name}</h1>
                        <h2>{watch.detail}</h2>
                        <p>
                            {watch.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                        <p>Ngày tạo: {watch.createdAt}</p>
                        <p>Ngày cập nhật: {watch.updatedAt}</p>
                    </div>
                    <div className="watch-detail-right">
                        <div className="bottom-buttons">
                            <Button variant="primary">
                                <FontAwesomeIcon icon={faPlus} /> Thêm vào giỏ hàng
                            </Button>
                            {isFavorite ? (
                                <Button
                                    variant="danger"
                                    onClick={() => removeFromFavorites(watch)}
                                >
                                    <FontAwesomeIcon icon={faMinus} /> Xóa khỏi yêu thích
                                </Button>
                            ) : (
                                <Button variant="danger" onClick={() => addToFavorites(watch)}>
                                    <FontAwesomeIcon icon={faHeart} /> Thêm vào yêu thích
                                </Button>
                            )}
                            <Button className="BuyBtn" variant="warning">
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WatchDetail;
