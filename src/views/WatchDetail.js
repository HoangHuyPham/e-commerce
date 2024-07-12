import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from "../components/TopBar";
import "../assets/styles/WatchDetail.scss";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faPlus} from "@fortawesome/free-solid-svg-icons";

const initialWatchData = [
    {
        id: "1",
        name: "Đồng Hồ 1",
        price: 2000000,
        discount: 0,
        detail: "Đồng hồ đẹp",
        previewLink: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-revolver-D-MR01-GML_78e7ac1b-14e7-4599-89a6-a890f07da32c_360x.jpg?v=1711619479",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-02"
    },
    {
        id: "2",
        name: "Đồng Hồ 2",
        price: 2400000,
        discount: 0,
        detail: "Đồng hồ đẹp",
        previewLink: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-chrono-D-MC01BL_385b7508-debf-4443-9573-8202c710eca5_360x.jpg?v=1711619454",
        createdAt: "2023-01-03",
        updatedAt: "2023-01-04"
    },
    {
        id: "3",
        name: "Đồng Hồ 3",
        price: 12000000,
        discount: 0,
        detail: "Đồng hồ đẹp",
        previewLink: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-nova-D-FC01-S_41b309db-5795-4013-88a0-30c3013b3921_360x.jpg?v=1711619415",
        createdAt: "2023-01-05",
        updatedAt: "2023-01-06"
    },
    {
        id: "4",
        name: "Đồng Hồ 4",
        price: 1000000,
        discount: 0,
        detail: "Đồng hồ đẹp",
        previewLink: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-olym-pianus-op89322k-t-nam-quartz-day-inox-thep-khong-gi-05-2023_360x.jpg?v=1711576474",
        createdAt: "2023-01-07",
        updatedAt: "2023-01-08"
    },
    {
        id: "5",
        name: "Đồng Hồ 5",
        price: 500000,
        discount: 0,
        detail: "Đồng hồ đẹp",
        previewLink: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-mod-D-FB01-BLBL_a90add3e-8e93-47e8-b71f-58b813a99a63_360x.jpg?v=1711619409",
        createdAt: "2023-01-09",
        updatedAt: "2023-01-10"
    }
];

function WatchDetail() {
    const { id } = useParams();
    const [detail, setDetail] = useState({
        id: 'id',
        name: 'name',
        price: 0,
        discount: 0,
        detail: 'detail',
        previewLink: 'previewLink',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    useEffect(() => {
        const foundWatch = initialWatchData.find(w => w.id === id);
        if (foundWatch) {
            setDetail(foundWatch);
        } else {
            setDetail(null); // set to null if watch is not found
        }
    }, [id]);

    if (!detail) {
        return <div>Đồng hồ không tồn tại</div>;
    }

    return (
        <div className="watch-detail-container">
            <TopBar/>
            <div className="watch-detail">
                <h1>{detail.name}</h1>
                <img src={detail.previewLink} alt={detail.name}/>
                <h2>{detail.detail}</h2>
                <p>{detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <p>Ngày tạo: {detail.createdAt}</p>
                <p>Ngày cập nhật: {detail.updatedAt}</p>
                <div className="bottom-buttons">
                    <Button variant="primary"><FontAwesomeIcon icon={faPlus} /></Button>
                    <Button variant="danger"><FontAwesomeIcon icon={faHeart} /></Button>
                    <Button className="BuyBtn" variant="warning">Mua ngay</Button>
                </div>
            </div>
        </div>
    );
}

export default WatchDetail;
