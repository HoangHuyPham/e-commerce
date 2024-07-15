import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import MyToast from "../components/MyToast";
import {Link} from "react-router-dom";

class WatchList extends Component {
  state = {
    favoriteData: JSON.parse(localStorage.getItem("favoriteData")) || [],
    dataToast: [],
  };

  data = [
    {
      id: 1,
      "name":"Đồng Hồ 1",
      "price": 2000000,
      "discount": 0,
      "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-revolver-D-MR01-GML_78e7ac1b-14e7-4599-89a6-a890f07da32c_360x.jpg?v=1711619479"
    },
    {
      id: 2,
      "name":"Đồng Hồ 2",
      "price": 2400000,
      "discount": 0,
      "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-chrono-D-MC01BL_385b7508-debf-4443-9573-8202c710eca5_360x.jpg?v=1711619454"

    },
    {
      id: 3,
      "name":"Đồng Hồ 3",
      "price": 12000000,
      "discount": 0,
      "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-nova-D-FC01-S_41b309db-5795-4013-88a0-30c3013b3921_360x.jpg?v=1711619415"

    },
    {
      id: 4,
      "name":"Đồng Hồ 4",
      "price": 1000000,
      "discount": 0,
      "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-olym-pianus-op89322k-t-nam-quartz-day-inox-thep-khong-gi-05-2023_360x.jpg?v=1711576474"

    },
    {
      id: 5,
      "name":"Đồng Hồ 5",
      "price": 500000,
      "discount": 0,
      "link": "https://shopdongho.com.vn/cdn/shop/files/dong-ho-mvmt-mod-D-FB01-BLBL_a90add3e-8e93-47e8-b71f-58b813a99a63_360x.jpg?v=1711619409"

    }
  ];

  handleAddToCart = (params) => {

  }

  addToFavorites = (watch) => {
    const { favoriteData } = this.state;
    if (!favoriteData.some((item) => item.id === watch.id)) {
      const updatedFavorites = [...favoriteData, watch];
      this.setState({ favoriteData: updatedFavorites });
      localStorage.setItem("favoriteData", JSON.stringify(updatedFavorites));
      this.showToast(`${watch.name} đã được thêm vào danh sách yêu thích!`, "Thành công", true);
      window.dispatchEvent(new Event('favoritesUpdated'));
    } else {
      this.showToast(`${watch.name} đã có trong danh sách yêu thích!`, "Thông tin", false);
    }
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
    return (
        <div className="WatchList">
          <MyToast data={this.state.dataToast} />
          <span className="Title">Sản phẩm bán chạy</span>
          <div className="Content">
            {this.data.map((watch, i) => {
              return (
                  <Card key={i}>
                    <Link to={`/watch/${watch.id}`}>
                      <Card.Img variant="top" src={watch.link} />
                    </Link>
                    <Card.Body>
                      <Card.Title>{watch.name}</Card.Title>
                      <Card.Text>{watch.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="primary"><FontAwesomeIcon icon={faPlus} /></Button>
                      <Button
                          variant="danger"
                          onClick={() => this.addToFavorites(watch)}
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
}

export default WatchList;
