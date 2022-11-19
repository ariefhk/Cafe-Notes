import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numberWithCommas } from "../../utils/formatNumber";
import axios from "axios";
import { useState } from "react";
import { API_ALL_TRANSACTION } from "../../utils/allTransaction";
import swal from "sweetalert";

function TotalBayar({ keranjang, handleDeleteAll }) {
  const [bayar, setBayar] = useState(0);

  // token
  const token = localStorage.getItem("token");
  axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;

  const submitTotalBayar = (pesanan) => {
    const products_id = pesanan.map((value) => value.id);
    const products_jumlah = pesanan.map((value) => value.jumlah);
    const data = {
      product_id: products_id,
      jumlah: products_jumlah,
      diterima: bayar,
    };
    console.log("dari total bayar ::>", pesanan);

    axios
      .post(API_ALL_TRANSACTION, data)
      .then((res) => {
        const data = res.data;
        console.log("data bayar ygy: ", data);
        handleDeleteAll();
        swal({
          title: "Bayar Pesanan!",
          text: "Sukses Bayar Pesanan ",
          icon: "success",
          button: false,
          timer: 1700,
        });
        setBayar(0);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
        let message = error.response.data.message;
        if (message === "Uang kurang") {
          swal({
            title: "Uang Kurang!",
            text: `Total : ${error.response.data.data.total_pembayaran} \n    Uang diterima : ${error.response.data.data.uang_diterima}`,
            icon: "error",
            button: false,
            timer: 2000,
          });
        }
      });
  };

  const totalBayar = (keranjang || []).reduce((result, item) => {
    return result + item.harga * item.jumlah;
  }, 0);

  const changeHandler = (event) => {
    setBayar(event.target.value);
    console.log(event.target.value);
  };
  console.log("Jumlah yang harus dibayarkan: ", totalBayar);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 48,
        width: "300px",
      }}
    >
      <Col>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "20px" }}>
            Total Harga :<strong>Rp. {numberWithCommas(totalBayar)}</strong>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form>
            <Form.Group className="" controlId="inputMoney">
              <Form.Control
                type="number"
                placeholder="Masukan Uang"
                value={bayar}
                style={{
                  borderColor: "#594546",
                  width: "200px",
                  fontSize: "20px",
                }}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
          </Form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            block
            className={`my-3 mr-2`}
            style={{
              backgroundColor: "#594546",
              borderColor: "#594546",
              padding: "7px 50px",
            }}
            onClick={() => submitTotalBayar(keranjang)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
          </Button>
        </div>
      </Col>
    </div>
  );
}

export default TotalBayar;
