import { useEffect, useState } from "react";
import { Button, Form, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/styles/App.scss";
import PreviewEditor from "../components/PreviewEditor";
import { ResponseStatus } from "../ResponseStatus";
import MyToast from "../components/MyToast";
import Loading from "../components/Loading";

function ProductPanel() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [dataToast, setDataToast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectTab, setSelectTab] = useState("products"); // users || orders
  const [newProduct, setNewProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    min: -1,
    max: -1,
  });
  const [currentOffset, setOffset] = useState(-1);

  useEffect(() => {
    updatePagination();
  }, []);

  useEffect(() => {
    getProduct();
  }, [currentOffset]);

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

  const updateTable = () => {
    products.map((product, k) => {
      try {
        fetch(`http://localhost:3001/api/v1/auth/products/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(product),
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
            if (
              data.status === ResponseStatus.UNAUTHENTICATE
            ) {
              setDataToast([
                {
                  id: new Date().getTime(),
                  success: false,
                  info: "Thất bại",
                  content: "Bạn không có quyền thực hiện hành động này",
                  show: true,
                },
              ]);
              setTimeout(() => {
                navigate("home");
              }, 2000);
              
              return;
            }

            setTimeout(() => {
              setLoading(false);
              setDataToast([
                {
                  id: new Date().getTime(),
                  show: true,
                  info: "Thành công",
                  content: `Cập nhật thành công`,
                },
              ]);
            }, 100);
            getProduct();
            updatePagination().then(() => {
              if (data.data.min >= 0) {
                setOffset(0);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
        navigate("sign/in");
      }
      return product;
    });
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

  const getProduct = async () => {
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
          setProducts([...data.data]);
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

  const editInputHandle = (event, id, type) => {
    setProducts(
      products.map((product, k) => {
        if (product.id === id) {
          product = { ...product, [type]: event.target.value };
        }
        return product;
      })
    );
  };


  const handleDeleteProduct = (id) => {
    try {
      fetch(`http://localhost:3001/api/v1/auth/products/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({id}),
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

          if (
            data.status === ResponseStatus.UNAUTHENTICATE
          ) {
            setDataToast([
              {
                id: new Date().getTime(),
                success: false,
                info: "Thất bại",
                content: "Bạn không có quyền thực hiện hành động này",
                show: true,
              },
            ]);
            setTimeout(() => {
              navigate("home");
            }, 2000);
            
            return;
          }
          getProduct().then(()=>updatePagination());

          setTimeout(() => {
            setDataToast([
              {
                id: new Date().getTime(),
                success: false,
                info: "Thành công",
                content: `Xóa sản phẩm (ID: ${id}) thành công`,
                show: true,
              },
            ]);
          }, 100);

        })
        .catch((err) => {
          setTimeout(() => {
            setDataToast([
              {
                id: new Date().getTime(),
                success: false,
                info: "Thất bại",
                content: "Xóa thất bại",
                show: true,
              },
            ]);
          }, 100);
          console.log(err.code);
        });
    } catch (error) {
      console.error(error);
      navigate("sign/in");
    }
  };

  const handleUploadNewProduct = () => {
    try {
      fetch(`http://localhost:3001/api/v1/auth/products/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
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

          if (
            data.status === ResponseStatus.UNAUTHENTICATE
          ) {
            setDataToast([
              {
                id: new Date().getTime(),
                success: false,
                info: "Thất bại",
                content: "Bạn không có quyền thực hiện hành động này",
                show: true,
              },
            ]);
            setTimeout(() => {
              navigate("home");
            }, 2000);
            
            return;
          }

          if (data.status === ResponseStatus.UNIQUE_KEY) {
            setTimeout(() => {
              setDataToast([
                {
                  id: new Date().getTime(),
                  success: false,
                  info: "Thất bại",
                  content: "Đã tồn tại ID này",
                  show: true,
                },
              ]);
            }, 100);
            return;
          }

          getProduct();
          updatePagination().then(() => setOffset(pagination.max));

          setTimeout(() => {
            setDataToast([
              {
                id: new Date().getTime(),
                success: false,
                info: "Thành công",
                content: "Thêm sản phẩm thành công",
                show: true,
              },
            ]);
          }, 100);

          
          setProducts([...data.data]);
        })
        .catch((err) => {
          console.log(err.code);
        });
    } catch (error) {
      console.error(error);
      navigate("sign/in");
    }
  };

  const setPreviewHandle = (id, value) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return product = {
            ...product,
            preview: {
              url: value.url
            },
            previewId: value.idPreview,
          };
        }
        return product;
      })
    );
  };

  useEffect(() => {
    updateInfo();
  }, []);

  const updateInfo = async () => {
    try {
      fetch("http://localhost:3001/api/v1/auth/me", {
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

          setUserInfo(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
      navigate("sign/in");
    }
  };
  console.log("re-ren")
  return (
    <>
      <Loading loading={loading}/>
      <MyToast data={dataToast} />

      <Table className="TableProduct" striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>ID</td>
            <td>Tên</td>
            <td>Mô tả</td>
            <td>Giá</td>
            <td>Danh mục</td>
            <td>Hình ảnh</td>
          </tr>
        </thead>
        <tbody>
          {products.map((v, k) => (
            <tr key={k}>
              <td>
                <Form.Group>
                  <Form.Control
                    disabled
                    value={v.id}
                    placeholder="ID"
                    type="number"
                    id="productID"
                    onChange={(event) => {
                      editInputHandle(event, v.id, "id");
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được để trống trường này
                  </Form.Control.Feedback>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    value={v.name}
                    placeholder="Tên sản phẩm"
                    type="text"
                    id="productName"
                    onChange={(event) => {
                      editInputHandle(event, v.id, "name");
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được để trống trường này
                  </Form.Control.Feedback>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    value={v.detail}
                    placeholder="Mô tả sản phẩm"
                    type="text"
                    id="productDetail"
                    onChange={(event) => {
                      editInputHandle(event, v.id, "detail");
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được để trống trường này
                  </Form.Control.Feedback>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    value={v.price}
                    placeholder="Giá sản phẩm"
                    type="number"
                    id="productPrice"
                    onChange={(event) => {
                      editInputHandle(event, v.id, "price");
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Không được để trống trường này
                  </Form.Control.Feedback>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Select
                    defaultValue={v.category}
                    onChange={(event) => {
                      editInputHandle(event, v.id, "category");
                    }}
                  >
                    <option value="1">Đồng hồ điện tử</option>
                    <option value="2">Đồng hồ cơ</option>
                    <option value="-1">Khác</option>
                  </Form.Select>
                </Form.Group>
              </td>
              <td className="AddProduct">
                <PreviewEditor
                  data={{ id: v.id, src: v.preview?.url }}
                  setDataToast={setDataToast}
                  setPreviewHandle={setPreviewHandle}
                />
                <Button onClick={()=>{handleDeleteProduct(v.id)}}>X</Button>
              </td>
            </tr>
          ))}

          {/* add product */}
          <tr>
            <td>
              <Form.Group>
                <Form.Control
                  placeholder="ID (Tùy chọn)"
                  type="number"
                  id="productID"
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, id: e.target.value });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Không được để trống trường này
                </Form.Control.Feedback>
              </Form.Group>
            </td>
            <td>
              <Form.Group>
                <Form.Control
                  placeholder="Tên sản phẩm"
                  type="text"
                  id="productName"
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, name: e.target.value });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Không được để trống trường này
                </Form.Control.Feedback>
              </Form.Group>
            </td>
            <td>
              <Form.Group>
                <Form.Control
                  as={"textarea"}
                  placeholder="Mô tả sản phẩm"
                  type="text"
                  id="productDetail"
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, detail: e.target.value });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Không được để trống trường này
                </Form.Control.Feedback>
              </Form.Group>
            </td>
            <td>
              <Form.Group>
                <Form.Control
                  placeholder="Giá sản phẩm"
                  type="number"
                  id="productPrice"
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, price: e.target.value });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Không được để trống trường này
                </Form.Control.Feedback>
              </Form.Group>
            </td>
            <td>
              <Form.Group>
                <Form.Select
                  defaultValue={1}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, category: e.target.value });
                  }}
                >
                  <option value="1">Đồng hồ điện tử</option>
                  <option value="2">Đồng hồ cơ</option>
                  <option value="-1">Khác</option>
                </Form.Select>
              </Form.Group>
            </td>
            <td className="AddProduct">
              <Button className="AddBtn" onClick={handleUploadNewProduct}>
                Thêm
              </Button>
              <Button variant="danger" onClick={updateTable}>
                Lưu
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
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
    </>
  );
}

export default ProductPanel;
