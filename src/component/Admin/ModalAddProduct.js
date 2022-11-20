import React from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { API_STORE_PRODUCT } from "../../utils/storeProduct";
import { useNavigate } from "react-router-dom";

function ModalAddProduct({ showAdd, handleCloseAdd, showingProduct }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [preview, setPreview] = useState();
  const [data, setData] = useState({
    title: "",
    description: "",
    stock: 0,
    harga_beli: 0,
    harga_jual: 0,
    category_id: 1,
    thumbnail: null,
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    if (!selectedImage) {
      setPreview("https://fakeimg.pl/350x200/");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("data mau dikirim: ", data);

    axios
      .post(API_STORE_PRODUCT, data, config)
      .then((res) => {
        const data = res.data;
        // console.log("data dari update Product: ", data);
        handleCloseAdd();
        handleSucces();
        showingProduct();
        swal({
          title: "Berhasil Tambah Product!",
          text: `Produk : ${data.data.title}`,
          icon: "success",
          button: false,
          timer: 1500,
        });
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
  };

  const handleSucces = () => {
    setPreview("https://fakeimg.pl/350x200/");
    setData({
      title: "",
      description: "",
      stock: 0,
      harga_beli: 0,
      harga_jual: 0,
      category_id: 1,
      thumbnail: null,
    });
  };

  const changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    // let file = event.target.files[0];

    if (name === "title") {
      setData({ ...data, title: value });
    } else if (name === "description") {
      setData({ ...data, description: value });
    } else if (name === "stock") {
      setData({ ...data, stock: value });
    } else if (name === "harga_beli") {
      setData({ ...data, harga_beli: value });
    } else if (name === "harga_jual") {
      setData({ ...data, harga_jual: value });
    } else if (name === "stock") {
      setData({ ...data, stock: value });
    } else if (name === "category_id") {
      setData({ ...data, category_id: value });
    }
  };

  return (
    <Modal
      show={showAdd}
      onHide={() => {
        handleCloseAdd();
        setSelectedImage("");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <div style={{ margin: "auto" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={preview} className="card-img-top" />
        </Card>
      </div>
      <Modal.Body>
        <Form className="mt-4" onSubmit={handleSubmit}>
          {/* Thumbhnail */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Foto Produk</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                // setProduct({ ...product, thumbnail: e.target.files[0] })
                // changeHandler
                setSelectedImage(e.target.files[0]);
                setData({ ...data, thumbnail: e.target.files[0] });
              }}
              accept="image/*"
              name="thumbnail"
            />
          </Form.Group>
          {/* Title */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              type="text"
              placeholder="Judul Produk"
              onChange={changeHandler}
              value={data.title}
              name="title"
            />
          </Form.Group>
          {/* Categori Id */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Kategori</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="category_id"
              value={data.category_id}
              onChange={changeHandler}
            >
              <option value="1">Makanan</option>
              <option value="2">Minuman</option>
            </Form.Select>
          </Form.Group>
          {/* Deskripsi */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Deskripsi Product"
              onChange={changeHandler}
              value={data.description}
              name="description"
            />
          </Form.Group>
          {/* Stok */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Stok</Form.Label>
            <Form.Control
              type="number"
              placeholder="Stock"
              onChange={changeHandler}
              value={data.stock}
              name="stock"
            />
          </Form.Group>
          {/* Beli */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Harga Beli</Form.Label>
            <Form.Control
              type="number"
              placeholder="Harga Beli"
              onChange={changeHandler}
              value={data.harga_beli}
              name="harga_beli"
            />
          </Form.Group>
          {/* Jual */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Harga Jual</Form.Label>
            <Form.Control
              type="number"
              placeholder="Harga Jual"
              onChange={changeHandler}
              value={data.harga_jual}
              name="harga_jual"
            />
          </Form.Group>

          <div
            style={{
              display: "flex",
              gap: 50,
              justifyContent: "center",
              // flexDirection: "column",
            }}
          >
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setSelectedImage("");
            }}
          >
            Close
          </Button>
        </Modal.Footer> */}
    </Modal>
  );
}

export default ModalAddProduct;
