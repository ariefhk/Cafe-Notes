import React from "react";
import { useState, useEffect } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import { API_BYID_CATEGORY } from "../../utils/byIdCategory";
import FormAdmin from "./FormAdmin";
import ModalProduct from "./ModalProduct";
import ShowProduct from "./ShowProduct";
import ModalAddProduct from "./ModalAddProduct";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function ProductAdmin() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [category, setCategory] = useState(1);
  const [product, setProduct] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [selectProduct, setSelectProduct] = useState({
    id: "",
    title: "",
    description: "",
    stock: 0,
    harga_beli: 0,
    harga_jual: 0,
    category_id: "",
    thumbnail: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = React.useState([]);

  //token
  const token = localStorage.getItem("token");
  axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (role !== "Admin") {
      swal({
        title: "Akses di Cekal!",
        text: "Anda Bukan Admin!",
        icon: "error",
        button: false,
        timer: 1700,
      });
      navigate("/");
    } else {
      if (fetch === true || category) {
        axios
          .get(API_BYID_CATEGORY + category)
          .then((res) => {
            const data = res.data;
            // setProduct(data.data.products);
            //Filter searchbar
            setProduct(
              data.data.products.filter((product) =>
                String(product.title).toLowerCase().includes(searchTerm)
              )
            );
          })
          .catch((error) => {
            // console.log("Boo..ERROR:> ", error);
            if (error.response.data.message === "Unauthenticated.") {
              swal({
                title: "Sesi telah berakhir, Silahkan Login kembali!",
                text: `${error.response.data.message}`,
                icon: "error",
                button: false,
                timer: 1700,
              });
              navigate(`/login`);
            }
          });
      }
    }
    setFetch(false);
  }, [category, fetch, role, navigate, searchTerm]);

  const showingProduct = () => {
    setFetch(true);
  };

  const changeHandler = (event) => {
    let value = event.target.value;
    setCategory(value);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (value) => {
    setSelectProduct({
      id: value.id,
      title: value.title,
      description: value.description,
      stock: value.stock,
      harga_beli: value.harga_beli,
      harga_jual: value.harga_jual,
      category_id: value.category_id,
      thumbnail: value.thumbnail,
    });
    setShow(true);
  };

  // Tambah Product
  const handleShowAdd = () => {
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  // console.log("daftar product:", product);

  const handleSearch = (event) => {
    setSearchTerm(String(event.target.value).toLowerCase());
    // console.log("test:", event.target.value);
  };

  return (
    <Col md={9} mt={3}>
      <Row>
        <Col md={10}>
          <h4 className="judul-color" style={{ textAlign: "center" }}>
            <strong>Edit Produk</strong>
          </h4>
          <hr />
          <Row>
            <Col>
              <FormAdmin category={category} changeHandler={changeHandler} />
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Cari Produk"
                  onChange={handleSearch}
                  value={searchTerm}
                  name="produk"
                />
              </Form.Group>
            </Col>
          </Row>
          <Col className="mt-3">
            <div className="overflow-auto hasil3">
              <Row>
                {product &&
                  product.map((value, index) => {
                    return (
                      <ShowProduct
                        key={value.id}
                        product={value}
                        handleShow={handleShow}
                      />
                    );
                  })}
              </Row>
            </div>
          </Col>
          <ModalProduct
            show={show}
            selectProduct={selectProduct}
            handleClose={handleClose}
            showingProduct={showingProduct}
          />
        </Col>
        <Col md={2}>
          <Button
            style={{ backgroundColor: "#594546", borderColor: "#594546" }}
            onClick={() => handleShowAdd()}
          >
            Add Product
          </Button>
          <ModalAddProduct
            showAdd={showAdd}
            handleCloseAdd={handleCloseAdd}
            showingProduct={showingProduct}
          />
        </Col>
      </Row>
    </Col>
  );
}

export default ProductAdmin;
