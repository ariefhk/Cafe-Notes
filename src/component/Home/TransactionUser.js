import NavbarComponent from "../Navbar/NavbarComponent";
import React from "react";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ALL_TRANSACTION } from "../../utils/allTransaction";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/formatNumber";

function TransactionUser() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [detailTransaksi, setDetailTransaksi] = useState("");
  const [dataDetail, setDataDetail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //token
  const token = localStorage.getItem("token");
  axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(API_ALL_TRANSACTION)
      .then((res) => {
        const data = res.data;
        console.log("data transaksi;;;;", data.data);
        // data.data.products.filter((product) =>
        //   String(product.title).toLowerCase().includes(searchTerm)
        // );
        setData(
          data.data.filter((transaksi) =>
            String(transaksi.code).toLowerCase().includes(searchTerm)
          )
        );
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(String(event.target.value).toLowerCase());
    // console.log("test:", event.target.value);
  };

  const moveToHome = () => {
    navigate(`/`);
  };

  const handleShow = (transaksi) => {
    let link = `https://cafe-notes-api.herokuapp.com/api/transaction/${transaksi.id}`;

    axios
      .get(link)
      .then((res) => {
        const data = res.data;
        // console.log("tesyt", data.data);
        setDetailTransaksi(data.data.transaction_detail);
        handleDetail(data.data.transaction_detail);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  const handleDetail = (datas) => {
    if (datas) {
      let data = [];
      let promises = [];
      for (let i = 0; i < datas.length; i++) {
        promises.push(
          axios
            .get(
              "https://cafe-notes-api.herokuapp.com/api/product/" +
                datas[i].product_id
            )
            .then((response) => {
              // do something with response
              data.push(response.data.data);
            })
            .catch((error) => {
              console.log("Boo..ERROR:> ", error);
              let message = error.response.data.message;
              if (message === "Product not found") {
                swal({
                  title: "Gagal",
                  text: `${message}`,
                  icon: "error",
                  button: false,
                  timer: 2000,
                });
              }
              if (message === "Unauthenticated.") {
                swal({
                  title: "Sesi telah berakhir, Silahkan Login kembali!",
                  text: `${error.response.data.message}`,
                  icon: "error",
                  button: false,
                  timer: 1700,
                });
                navigate(`/login`);
              }
            })
        );
      }
      Promise.all(promises).then(() => setDataDetail([data]));
    }
  };

  if (dataDetail) {
    console.log("Akhirnya: ", dataDetail);
  }

  const handleShowProdImage = (product_id) => {
    if (dataDetail) {
      for (let i = 0; i < dataDetail[0].length; i++) {
        if (dataDetail[0][i].id === product_id) {
          // swal({
          //   title: "Berhasil",
          //   text: `Produk Ditemukan!`,
          //   icon: "success",
          //   button: false,
          //   timer: 2000,
          // });
          return dataDetail[0][i].thumbnail;
        }
      }
    }
    return "https://iili.io/H9QOGXs.png";
  };

  const handleShowProdName = (product_id) => {
    if (dataDetail) {
      for (let i = 0; i < dataDetail[0].length; i++) {
        if (dataDetail[0][i].id === product_id) {
          return dataDetail[0][i].title;
        }
      }
    }
    return "Not Found";
  };

  console.log("detail transaksi ;", detailTransaksi);

  if (data.length === 0) {
    return (
      <div>
        <NavbarComponent />
        <div className={`mt-3 mx-5`}>
          <Row>
            <Col md={2}>
              <div>
                <Button
                  style={{ backgroundColor: "#9E7676", borderColor: "#9E7676" }}
                  onClick={() => moveToHome()}
                >
                  Back Home
                </Button>
              </div>
            </Col>
            <Col md={6} mt={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4 className="judul-color">
                  <strong>Transaksi</strong>
                </h4>
              </div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Cari Transaksi"
                  onChange={handleSearch}
                  value={searchTerm}
                  name="transaksi"
                />
              </Form.Group>
              <h5 style={{ textAlign: "center", marginTop: "20px" }}>
                Transaksi Tidak ditemukan...
              </h5>
            </Col>
            <Col md={4} mt={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4 className="judul-color">
                  <strong>Detail Product</strong>
                </h4>
              </div>
              {/* <hr /> */}
              {/* {detailTransaksi.length !== 0 && (
                <Card className="overflow-auto hasil4 ">
                  <ListGroup variant="flush">
                    {detailTransaksi.map((transaksi) => {
                      return (
                        <ListGroup.Item
                          key={transaksi.id}
                          // onClick={() => handleShow(transaksi)}
                        >
                          <Row>
                            <Col>
                              <p>
                                <strong>Product Id</strong>:{" "}
                                {transaksi.product_id}
                              </p>

                              <Image
                                src={handleShowProdImage(transaksi.product_id)}
                                width="200px"
                                style={{ margin: "20px", borderRadius: "10px" }}
                              />

                              <p>
                                <strong>Nama Produk</strong>:{" "}
                                {handleShowProdName(transaksi.product_id)}
                              </p>
                              <p>
                                <strong>Harga Satuan</strong>: Rp.
                                {numberWithCommas(transaksi.harga_jual)}
                              </p>
                              <p>
                                <strong>Jumlah Pembelian</strong>:{" "}
                                {transaksi.kuantitas}
                              </p>
                              <p>
                                <strong>Total</strong> : Rp.
                                {numberWithCommas(transaksi.total)}
                              </p>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </Card>
              )} */}
            </Col>
          </Row>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavbarComponent />
        <div className={`mt-3 mx-5`}>
          <Row>
            <Col md={2}>
              <div>
                <Button
                  style={{ backgroundColor: "#9E7676", borderColor: "#9E7676" }}
                  onClick={() => moveToHome()}
                >
                  Back Home
                </Button>
              </div>
            </Col>
            <Col md={6} mt={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4 className="judul-color">
                  <strong>Transaksi</strong>
                </h4>
              </div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Cari Transaksi"
                  onChange={handleSearch}
                  value={searchTerm}
                  name="transaksi"
                />
              </Form.Group>
              {/* <hr /> */}
              {data.length !== 0 && (
                <Card className="overflow-auto hasil2 mt-3">
                  <ListGroup variant="flush">
                    {data.map((transaksi) => {
                      return (
                        <ListGroup.Item
                          key={transaksi.id}
                          onClick={() => handleShow(transaksi)}
                        >
                          <Row>
                            <Col>
                              <strong>
                                <h4>
                                  <strong>Code : {transaksi.code}</strong>
                                </h4>
                              </strong>
                              <p>
                                <strong>Id Transaksi</strong> : {transaksi.id}
                              </p>
                              {/* <p>Metode : {transaksi.method}</p> */}
                              <p>
                                <strong>Jumlah Barang yang dibeli</strong> :{" "}
                                {transaksi.total_kuantitas}
                              </p>
                              <p>
                                <strong>Uang Diterima</strong> : Rp.
                                {numberWithCommas(transaksi.diterima)}
                              </p>
                              <p>
                                <strong>Total harga</strong> : Rp.
                                {numberWithCommas(transaksi.total_harga)}
                              </p>
                              <p>
                                <strong>Kembalian</strong> : Rp.
                                {numberWithCommas(transaksi.kembalian)}
                              </p>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </Card>
              )}
            </Col>
            <Col md={4} mt={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4 className="judul-color">
                  <strong>Detail Product</strong>
                </h4>
              </div>
              {/* <hr /> */}
              {detailTransaksi.length !== 0 && (
                <Card className="overflow-auto hasil4 ">
                  <ListGroup variant="flush">
                    {detailTransaksi.map((transaksi) => {
                      return (
                        <ListGroup.Item
                          key={transaksi.id}
                          // onClick={() => handleShow(transaksi)}
                        >
                          <Row>
                            <Col>
                              <p>
                                <strong>Product Id</strong>:{" "}
                                {transaksi.product_id}
                              </p>

                              <Image
                                src={handleShowProdImage(transaksi.product_id)}
                                width="200px"
                                style={{ margin: "20px", borderRadius: "10px" }}
                              />

                              <p>
                                <strong>Nama Produk</strong>:{" "}
                                {handleShowProdName(transaksi.product_id)}
                              </p>
                              <p>
                                <strong>Harga Satuan</strong>: Rp.
                                {numberWithCommas(transaksi.harga_jual)}
                              </p>
                              <p>
                                <strong>Jumlah Pembelian</strong>:{" "}
                                {transaksi.kuantitas}
                              </p>
                              <p>
                                <strong>Total</strong> : Rp.
                                {numberWithCommas(transaksi.total)}
                              </p>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TransactionUser;
