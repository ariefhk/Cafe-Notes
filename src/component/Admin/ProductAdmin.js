import React from "react";
import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
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
            setProduct(data.data.products);
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
      }
    }
    setFetch(false);
  }, [category, fetch]);

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

  const handleShowAdd = () => {
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  console.log(product);

  return (
    <Col md={9} mt={3}>
      <Row>
        <Col md={10}>
          <h4 className="judul-color" style={{ textAlign: "center" }}>
            <strong>Edit Produk</strong>
          </h4>
          <hr />
          <FormAdmin category={category} changeHandler={changeHandler} />
          <Col className="mt-3">
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
          </Col>
          <ModalProduct
            show={show}
            selectProduct={selectProduct}
            handleClose={handleClose}
            showingProduct={showingProduct}
          />
        </Col>
      </Row>
    </Col>
  );
}

export default ProductAdmin;
