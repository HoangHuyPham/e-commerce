import React from 'react';
import { useParams } from 'react-router-dom';
import TopBar from "../components/TopBar";
import "../assets/styles/WatchDetail.scss";
import SlideShow from "../components/SlideShow";

function WatchDetail() {
    const { id } = useParams();
    const watchData = [
        {
            "id": "1",
            "name": "Đồng Hồ 1",
            "price": 2000000,
            "discount": 0,
            "description": "Đồng hồ đẹp",
            "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-revolver-D-MR01-GML_78e7ac1b-14e7-4599-89a6-a890f07da32c_360x.jpg?v=1711619479"
        },
        {
            "id": "2",
            "name": "Đồng Hồ 2",
            "price": 2400000,
            "discount": 0,
            "description": "Đồng hồ đẹp",
            "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-chrono-D-MC01BL_385b7508-debf-4443-9573-8202c710eca5_360x.jpg?v=1711619454"
        },
        {
            "id": "3",
            "name": "Đồng Hồ 3",
            "price": 12000000,
            "discount": 0,
            "description": "Đồng hồ đẹp",
            "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-nova-D-FC01-S_41b309db-5795-4013-88a0-30c3013b3921_360x.jpg?v=1711619415"
        },
        {
            "id": "4",
            "name": "Đồng Hồ 4",
            "price": 1000000,
            "discount": 0,
            "description": "Đồng hồ đẹp",
            "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-olym-pianus-op89322k-t-nam-quartz-day-inox-thep-khong-gi-05-2023_360x.jpg?v=1711576474"
        },
        {
            "id": "5",
            "name": "Đồng Hồ 5",
            "price": 500000,
            "discount": 0,
            "description": "Đồng hồ đẹp",
            "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-mod-D-FB01-BLBL_a90add3e-8e93-47e8-b71f-58b813a99a63_360x.jpg?v=1711619409"
        }
    ];

    const watch = watchData.find(w => w.id === id);

    if (!watch) {
        return <div>Đồng hồ không tồn tại</div>;
    }

    return (
        <div className="watch-detail-container">
            <TopBar/>
            <div className="watch-detail">
                <h1>{watch.name}</h1>
                <img src={watch.link} alt={watch.name}/>
                <h>{watch.description}</h>
                <p>{watch.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</p>
            </div>
        </div>
    );
}

export default WatchDetail;
