import React from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

function ModalProduct({ show, handleClose, selectProduct, showingProduct }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [preview, setPreview] = useState();
  const [idProduct, setIdProduct] = useState();
  const [data, setData] = useState({
    title: "Test",
    description: "Test",
    stock: 10,
    harga_beli: 100,
    harga_jual: 200,
    category_id: 1,
    thumbnail: null,
    _method: "PUT",
  });

  const token = localStorage.getItem("token");

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedImage) {
      setPreview(selectProduct.thumbnail);
      setIdProduct(selectProduct.id);
      setData({
        title: selectProduct.title,
        description: selectProduct.description,
        stock: selectProduct.stock,
        harga_beli: selectProduct.harga_beli,
        harga_jual: selectProduct.harga_jual,
        category_id: selectProduct.category_id,
        _method: "PUT",
      });
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage, selectProduct]);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("data mau diupdate: ", data);
    let API_UPDATE = `http://cafe-notes-api.herokuapp.com/api/product/${idProduct}`;
    axios
      .post(API_UPDATE, data, config)
      .then((res) => {
        const data = res.data;
        console.log("data dari update Product: ", data);
        handleClose();
        showingProduct();
        swal({
          title: "Berhasil Update!",
          text: `testt`,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  const handleDelete = () => {
    // setData({ ...data, _method: "DELETE" });

    const DELETE_METHOD = {
      _method: "DELETE",
    };

    let API_DELETE = `http://cafe-notes-api.herokuapp.com/api/product/${idProduct}`;

    axios
      .post(API_DELETE, DELETE_METHOD, config)
      .then((res) => {
        const data = res.data;
        console.log("data dari update Product: ", data);
        handleClose();
        showingProduct();
        swal({
          title: "Berhasil Hapus Data!",
          text: `testt`,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
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

  if (selectProduct) {
    return (
      <Modal
        show={show}
        onHide={() => {
          handleClose();
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
                Update
              </Button>
              <Button variant="danger" onClick={() => handleDelete()}>
                Delete
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
  } else {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalProduct;
