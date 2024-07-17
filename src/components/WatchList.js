import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import MyToast from "../components/MyToast";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import {ResponseStatus} from "../ResponseStatus";

const WatchList = () => {
  const [favoriteData, setFavoriteData] = useState(JSON.parse(localStorage.getItem("favoriteData")) || []);
  const [dataToast, setDataToast] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    min: -1,
    max: -1,
  });
  const [currentOffset, setOffset] = useState(-1);

  const fetchData = async () => {
    setLoading(true)
    if (currentOffset === -1){
      setLoading(false)
      return;
    }

    try {
      fetch(`http://localhost:3001/api/v1/products/${currentOffset}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
          .then((e) => e.json())
          .then((data) => {
            if (
                data.status === ResponseStatus.EXPIRED_TOKEN ||
                data.status === ResponseStatus.UNAUTHORIZED
            ) {
              navigate("sign/in");
              return;
            }
            setData([...data.data]);
          })
          .catch((err) => {
            console.log(err);
          }).finally(()=>{
        setTimeout(() => {
          setLoading(false)
        }, 100);
      });
    } catch (error) {
      console.error(error);
      navigate("sign/in");
    }
  };

  const getPaginationItem = () => {
    let items = [];
    let min =
        currentOffset - 1 < pagination.min ? currentOffset : currentOffset - 1;
    let max =
        currentOffset + 1 > pagination.max ? currentOffset : currentOffset + 1;
    for (let number = min + 1; number <= max + 1; number++) {
      items.push(
          <Pagination.Item
              key={number}
              onClick={() => {
                setOffset(number - 1);
              }}
              active={number === currentOffset + 1}
          >
            {number}
          </Pagination.Item>
      );
    }
    return items;
  };

  useEffect(() => {
    fetchData();
  }, [currentOffset]);

  useEffect(() => {
    updatePagination();
  }, []);

  const addToCart = (watch) => {
    if (user == null) {
      navigate("/sign/in");
    } else {
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      const updatedCart = [...cartData, watch];
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      showToast(`${watch.name} đã được thêm vào giỏ hàng!`, "Thành công", true);
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };
  const updatePagination = async () => {
    try {
      await fetch(`http://localhost:3001/api/v1/products`, {
        method: "GET",
      })
          .then((e) => e.json())
          .then((data) => {
            if (
                data.status === ResponseStatus.EXPIRED_TOKEN ||
                data.status === ResponseStatus.UNAUTHORIZED
            ) {
              navigate("sign/in");
              return;
            }
            setPagination({ ...data.data });
            if (data.data.min >= 0) {
              setOffset(0);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    } catch (error) {
      console.error(error);
      navigate("sign/in");
    }
  };

  useEffect(() => {
    let payload = accessToken?.split(".")[1]
    if (!payload)
      return
    let decodedPayload = JSON.parse(atob(payload))

    setUser({
      ...decodedPayload
    })
  }, [accessToken]);

  const addToFavorites = (watch) => {
    if (user == null) {
      navigate("/sign/in");
    } else {
      if (!favoriteData.some((item) => item.id === watch.id)) {
        const updatedFavorites = [...favoriteData, watch];
        setFavoriteData(updatedFavorites);
        localStorage.setItem("favoriteData", JSON.stringify(updatedFavorites));
        showToast(`${watch.name} đã được thêm vào danh sách yêu thích!`, "Thành công", true);
        window.dispatchEvent(new Event('favoritesUpdated'));
      } else {
        showToast(`${watch.name} đã có trong danh sách yêu thích!`, "Thông tin", false);
      }
    }
  };


  const handleWatchDetail = (watch) => {
    navigate(`/watch-detail/${watch.id}`, { state: { watch } });
  };

  const handleBuyNow = (watch) => {
    localStorage.setItem('buyNowItem', JSON.stringify(watch));
    navigate('/buynow');
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
          {Array.isArray(data) && data.length > 0 ? (
              data.map((watch, i) => (
                  <Card key={i}>
                      <div onClick={() => handleWatchDetail(watch)} className="card-img-container">
                    <Card.Img className="card-img" variant="top" src={watch?.preview?.url} />
                      </div>
                    <Card.Body>
                      <Card.Title>{watch.name}</Card.Title>
                      <Card.Text style={{ color: 'black' }}>{watch.detail}</Card.Text>
                      <Card.Text>{watch.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="primary"><FontAwesomeIcon icon={faShoppingCart} /></Button>
                      <Button
                          variant="danger"
                          onClick={() => addToFavorites(watch)}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </Button>
                      <Button className="BuyBtn" variant="warning">Mua ngay</Button>
                    </Card.Footer>
                  </Card>
              ))
          ) : (
              <div>No data available</div>
          )}
        </div>
        <Pagination className="Pagination">
          <Pagination.First
              onClick={() => {
                setOffset(pagination.min);
              }}
          />
          {getPaginationItem(currentOffset)}
          <Pagination.Last
              onClick={() => {
                setOffset(pagination.max);
              }}
          />
        </Pagination>
      </div>
  );
}

export default WatchList;
