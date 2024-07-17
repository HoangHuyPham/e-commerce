import { faHeart, faPlus, faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  FormGroup,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/App.scss";
import { ResponseStatus } from "../ResponseStatus";
import { AppContext } from "../stores/contexts/AppContext";
import Loading from "./Loading";
import MyToast from "./MyToast";

function SearchList() {
  const [favoriteData, setFavoriteData] = useState(JSON.parse(localStorage.getItem("favoriteData")) || []);
  const [user, setUser] = useState(null)
  const [dataToast, setDataToast] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))
  const [data, setData] = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [currentOffset, setOffset] = useState(-1);
  const [pagination, setPagination] = useState({
    min: -1,
    max: -1,
  });

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [category, setCategory] = useState();
  const [followPrice, setFollowPrice] = useState();
  const [priceFromTo, setPriceFromTo] = useState();
  const [alphabet, setAlphabet] = useState();
  useEffect(() => {
    let payload = accessToken?.split(".")[1]
    if (!payload)
      return
    let decodedPayload = JSON.parse(atob(payload))

    setUser({
      ...decodedPayload
    })
  }, []);

  useEffect(() => {
    getProduct();
  }, [currentOffset]);

  useEffect(() => {
    updatePagination();
    data.updateSearch = updateSearch;
  }, [currentOffset, data.keyword]);

  const handleFilter = () => {
    filterCategory(Number(category))
    filterFollowPrice(Number(followPrice))
    filterPriceFromTo(Number(priceFromTo))
    filterAlphabet(Number(alphabet))
  };

  const filterCategory = (type) => {
    if (!type || isNaN(type)) return
    
    setProducts(
      [...products.filter((product) => {
        return product.category === type;
      })]
    );
  };
  const filterFollowPrice = (type) => {
    if (!type || isNaN(type)) return
    if (type === 1){
      setProducts(
        [...products.sort((a, b)=> a.price - b.price)]
      );
    } else if (type === 2){
      setProducts(
        [...products.sort((a, b)=> b.price - a.price)]
      );
    }
  };

  const filterPriceFromTo = (type) => {
    if (!type || isNaN(type))
      return
    if (type === 1){
      
      setProducts(
        [...products.filter((product)=>product.price < 500000)]
      );
    } else if (type === 2){
      setProducts(
        [...products.filter((product)=>((product.price >= 500000) && (product.price <= 1000000)))]
      );
    } else if (type === 3){
      setProducts(
       [...products.filter((product)=>((product.price > 1000000)))]
      );
    }
  };

  const filterAlphabet = (type) => {
    if (!type || isNaN(type))
      return
    if (type === 1){
      setProducts(
        [...products.sort((a, b)=> a.name.charAt(0) - b.name.charAt(0))]
      );
    } else if (type === 2){
      setProducts(
        [...products.sort((a, b)=> b.name.charAt(0) - a.name.charAt(0))]
      );
    }
  };

  const updateSearch = () => {
    getProduct();
  };

  const updatePagination = async () => {
    if (!data?.keyword) return;
    try {
      await fetch(
        encodeURI(
          `http://localhost:3001/api/v1/products?keyword=${data?.keyword}`
        ),
        {
          method: "GET",
        }
      )
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

  const getProduct = async () => {
    if (currentOffset === -1) {
      return;
    }

    try {
      if (!data?.keyword) return;
      fetch(
        encodeURI(
          `http://localhost:3001/api/v1/search?keyword=${data?.keyword}`
        ),
        {
          method: "GET",
        }
      )
        .then((e) => e.json())
        .then((data) => {
          if (
            data.status === ResponseStatus.EXPIRED_TOKEN ||
            data.status === ResponseStatus.UNAUTHORIZED
          ) {
            navigate("sign/in");
            return;
          }
          setProducts([...data.data]);
        })
        .catch((err) => {
          console.log(err);
        })
        
    } catch (error) {
      console.error(error);
      navigate("sign/in");
    }
  };

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
    <div className="SearchPage">
      <MyToast data={dataToast}/>
      <Loading loading={loading} />
      <section className="Filter">
        <FormGroup className="Item">
          <InputGroup>
            <InputGroup.Text>Danh mục</InputGroup.Text>
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
              <option>Tất cả</option>
              <option value="1">Đồng hồ điện tử</option>
              <option value="2">Đồng hồ cơ</option>
              <option value="-1">Khác</option>
            </Form.Select>
          </InputGroup>
        </FormGroup>

        <FormGroup className="Item">
          <InputGroup>
            <InputGroup.Text>Sắp xếp theo giá</InputGroup.Text>
            <Form.Select onChange={(e) => setFollowPrice(e.target.value)}>
              <option>Tất cả</option>
              <option value="1">Từ thấp đến cao</option>
              <option value="2">Từ cao đến thấp</option>
            </Form.Select>
          </InputGroup>
        </FormGroup>

        <FormGroup className="Item">
          <InputGroup>
            <InputGroup.Text>Giá trị từ</InputGroup.Text>
            <Form.Select onChange={(e) => setPriceFromTo(e.target.value)}>
              <option>Tất cả</option>
              <option value="1">dưới 500.000đ</option>
              <option value="2">500.000đ - 1.000.000đ</option>
              <option value="3">trên 1.000.000đ</option>
            </Form.Select>
          </InputGroup>
        </FormGroup>

        <FormGroup className="Item">
          <InputGroup>
            <InputGroup.Text>Sắp xếp theo chữ cái</InputGroup.Text>
            <Form.Select onChange={(e) => setAlphabet(e.target.value)}>
              <option>Tất cả</option>
              <option value="1">Từ A-Z</option>
              <option value="2">Từ Z-A</option>
            </Form.Select>
          </InputGroup>
        </FormGroup>

        <Button onClick={handleFilter} className="Item" variant="danger">
          Lọc
        </Button>
      </section>

      <section className="SearchList">
        <div className="Content">
          {
            products.map((watch, i) => {
              return (
                <Card key={i}>
               
                    <Card.Img onClick={()=>{navigate(`/watch-detail/${watch.id}`, { state: { watch } })}} variant="top" src={watch?.preview?.url} />
                  
                  <Card.Body>
                    <Card.Title>{watch.name}</Card.Title>
                    <Card.Text>
                      {watch.price?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary">
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => addToFavorites(watch)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                    <Button className="BuyBtn" variant="warning">
                      Mua ngay
                    </Button>
                  </Card.Footer>
                </Card>
              );
            })
            
          }
        </div>
        {(!(products?.length > 0)) && <h1>
              Không có sản phẩm nào
              <FontAwesomeIcon icon={faSadCry} />
            </h1>}
      </section>
    </div>
  );
}

export default SearchList;
