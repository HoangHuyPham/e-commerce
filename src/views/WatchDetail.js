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
import { addToFavorites } from '../components/addToFavoriteUtil';

const WatchDetail = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))
    const [user, setUser] = useState(null)
    const location = useLocation();
    const { watch } = location.state || {};
    const [favoriteData, setFavoriteData] = useState(JSON.parse(localStorage.getItem("favoriteData")) || []);
    const [dataToast, setDataToast] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        let payload = accessToken?.split(".")[1]
        if (!payload)
            return
        let decodedPayload = JSON.parse(atob(payload))

        setUser({
            ...decodedPayload
        })
    }, [accessToken])

    if (!watch) {
        return <div>No watch data found.</div>;
    }

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

    const handleAddToFavorites = () => {
        addToFavorites(watch, user, favoriteData, setFavoriteData, showToast, navigate);
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
                    <Button variant="danger" onClick={() => handleAddToFavorites(watch)}>
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
