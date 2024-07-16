import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import MyToast from "../components/MyToast";
import { Link } from "react-router-dom";

const WatchList = () => {
  const [favoriteData, setFavoriteData] = useState(JSON.parse(localStorage.getItem("favoriteData")) || []);
  const [dataToast, setDataToast] = useState([]);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Đồng Hồ 1",
      detail: "Chi tiết đồng hồ 1",
      price: 2000000,
      category: "Luxury",
      previewId: "1a",
      createdAt: "2023-01-01",
      updatedAt: "2023-06-01",
      url: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-revolver-D-MR01-GML_78e7ac1b-14e7-4599-89a6-a890f07da32c_360x.jpg?v=1711619479"
    },
    {
      id: 2,
      name: "Đồng Hồ 2",
      detail: "Chi tiết đồng hồ 2",
      price: 2400000,
      category: "Sport",
      previewId: "2b",
      createdAt: "2023-02-01",
      updatedAt: "2023-06-01",
      url: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-chrono-D-MC01BL_385b7508-debf-4443-9573-8202c710eca5_360x.jpg?v=1711619454"
    },
    {
      id: 3,
      name: "Đồng Hồ 3",
      detail: "Chi tiết đồng hồ 3",
      price: 12000000,
      category: "Classic",
      previewId: "3c",
      createdAt: "2023-03-01",
      updatedAt: "2023-06-01",
      url: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-nova-D-FC01-S_41b309db-5795-4013-88a0-30c3013b3921_360x.jpg?v=1711619415"
    },
    {
      id: 4,
      name: "Đồng Hồ 4",
      detail: "Chi tiết đồng hồ 4",
      price: 1000000,
      category: "Casual",
      previewId: "4d",
      createdAt: "2023-04-01",
      updatedAt: "2023-06-01",
      url: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-olym-pianus-op89322k-t-nam-quartz-day-inox-thep-khong-gi-05-2023_360x.jpg?v=1711576474"
    },
    {
      id: 5,
      name: "Đồng Hồ 5",
      detail: "Chi tiết đồng hồ 5",
      price: 500000,
      category: "Digital",
      previewId: "5e",
      createdAt: "2023-05-01",
      updatedAt: "2023-06-01",
      url: "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-mod-D-FB01-BLBL_a90add3e-8e93-47e8-b71f-58b813a99a63_360x.jpg?v=1711619409"
    }
  ]);

  const handleAddToCart = (params) => {
    // add-to-cart logic here
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
      <div className="WatchList">
        <MyToast data={dataToast} />
        <span className="Title">Sản phẩm bán chạy</span>
        <div className="Content">
          {data.map((watch, i) => {
            return (
                <Card key={i}>
                  <Link to={`/watch/${watch.id}`}>
                    <Card.Img variant="top" src={watch.url} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{watch.name}</Card.Title>
                    <Card.Text style={{ color: 'black' }}>{watch.detail}</Card.Text>
                    <Card.Text>{watch.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary"><FontAwesomeIcon icon={faPlus} /></Button>
                    <Button
                        variant="danger"
                        onClick={() => addToFavorites(watch)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                    <Button className="BuyBtn" variant="warning">Mua ngay</Button>
                  </Card.Footer>
                </Card>
            );
          })}
        </div>
      </div>
  );
}

export default WatchList;
