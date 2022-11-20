import NavbarComponent from "../Navbar/NavbarComponent";
import React from "react";
import { Col, ListGroup, Row, Image, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ALL_TRANSACTION } from "../../utils/allTransaction";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function TransactionUser() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [detailTransaksi, setDetailTransaksi] = useState("");
  const [dataDetail, setDataDetail] = useState("");

  //token
  const token = localStorage.getItem("token");
  axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(API_ALL_TRANSACTION)
      .then((res) => {
        const data = res.data;
        console.log("data transaksi", data.data);
        setData(data.data);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }, []);

  const moveToHome = () => {
    navigate(`/`);
  };

  const handleShow = (transaksi) => {
    let link = `https://cafe-notes-api.herokuapp.com/api/transaction/${transaksi.id}`;

    axios
      .get(link)
      .then((res) => {
        const data = res.data;
        console.log("data transaksi:>", data.data);
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
              console.log("Error yaa ", error);
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
            })
        );
      }
      Promise.all(promises).then(() => setDataDetail([data]));
    }
  };

  if (dataDetail) {
    console.log("Akhirnya: ", dataDetail);
  }

  const handleShowProd = (product_id) => {
    if (dataDetail) {
      for (let i = 0; i < dataDetail[0].length; i++) {
        if (dataDetail[0][i].id === product_id) {
          swal({
            title: "Berhasil",
            text: `Produk Ditemukan!`,
            icon: "success",
            button: false,
            timer: 2000,
          });
          return dataDetail[0][i].thumbnail;
        }
      }
    }
    return "https://iili.io/H9QOGXs.png";
  };

  if (data.length === 0) {
    return (
      <div>
        <NavbarComponent />
        <Col className={`mt-3 mx-5`}>
          <div>
            <p>Loading...</p>
          </div>
        </Col>
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
                                <h5>Code : {transaksi.code}</h5>
                              </strong>
                              <p>Id Transaksi : {transaksi.id}</p>
                              {/* <p>Metode : {transaksi.method}</p> */}
                              <p>
                                Jumlah Barang yang dibeli :{" "}
                                {transaksi.total_kuantitas}
                              </p>
                              <p>Uang Diterima : {transaksi.diterima}</p>
                              <p>Total harga : {transaksi.total_harga}</p>
                              <p>Kembalian : {transaksi.kembalian}</p>
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
                <Card className="overflow-auto hasil2 mt-3">
                  <ListGroup variant="flush">
                    {detailTransaksi.map((transaksi) => {
                      return (
                        <ListGroup.Item
                          key={transaksi.id}
                          // onClick={() => handleShow(transaksi)}
                        >
                          <Row>
                            <Col>
                              <p>Product Id: {transaksi.product_id}</p>
                              <Image
                                src={handleShowProd(transaksi.product_id)}
                                width="100"
                              />
                              <p>
                                Pembelian: {transaksi.kuantitas}x Rp
                                {transaksi.harga_jual}
                              </p>
                              <p>Rp: {transaksi.total}</p>
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
