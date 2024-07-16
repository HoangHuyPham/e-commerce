import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faPlus} from "@fortawesome/free-solid-svg-icons";
import '../assets/styles/WatchDetail.scss';
import MyToast from "../components/MyToast";
import { useNavigate } from "react-router-dom";

const WatchDetail = () => {
    const location = useLocation();
    const { watch } = location.state || {};
    const [favoriteData, setFavoriteData] = useState(JSON.parse(localStorage.getItem("favoriteData")) || []);
    const [dataToast, setDataToast] = useState([]);

    if (!watch) {
        return <div>No watch data found.</div>;
    }

    const addToFavorites = (watch) => {
        if (!favoriteData.some((item) => item.id === watch.id)) {
            const updatedFavorites = [...favoriteData, watch];
            setFavoriteData(updatedFavorites);
            localStorage.setItem("favoriteData", JSON.stringify(updatedFavorites));
            showToast(`${watch.name} đã được thêm vào danh sách yêu thích!`, "Thành công", true);
            window.dispatchEvent(new Event('favoritesUpdated'));
        } else {
            showToast(`${watch.name} đã có trong danh sách yêu thích!`, "Thông tin", false);
        }
    };

    const showToast = (content, info, success) => {
        setDataToast([
            {
                id: new Date().getTime(),
                success: success,
                show: true,
                info: info,
                content: content,
            }
        ]);
    };

    return (
        <div>
            <span className="Title">Chi tiết sản phẩm</span>
            <div className="WatchDetail">
                <MyToast data={dataToast}/>
                <div className="image">
                    <Card.Img src={watch.url}/>
                </div>
                <div className="details">
                    <div className="title">{watch.name}</div>
                    <div className="info">{watch.detail}</div>
                    <div className="price">
                        {watch.price ? watch.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) : ''}
                    </div>
                    <div className="timestamps">
                        <div>Created: {watch.createdAt}</div>
                        <div>Updated: {watch.updatedAt}</div>
                    </div>
                </div>
                <div className="actions">
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button variant="danger" onClick={() => addToFavorites(watch)}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </Button>
                    <Button className="BuyBtn" variant="warning">
                        Mua ngay
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WatchDetail;
