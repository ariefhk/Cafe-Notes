import React from "react";
import { useState, useEffect } from "react";
import { API_ALL_TRANSACTION } from "../../utils/allTransaction";
import axios from "axios";
import { ListGroup, Row, Col } from "react-bootstrap";
import NavbarComponent from "../Navbar/NavbarComponent";

function TransactionUser() {
  const [data, setData] = useState("");

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

  if (data.length === 0) {
    return (
      <>
        <NavbarComponent />
        <div>Sedang Loading...</div>
      </>
    );
  } else {
    return (
      <>
        <NavbarComponent />
        {data.length !== 0 && (
          <ListGroup variant="flush">
            {data.map((transaksi) => {
              return (
                <ListGroup.Item key={transaksi.id}>
                  <Row>
                    <Col>
                      <strong>
                        <h5>Code : {transaksi.code}</h5>
                      </strong>
                      <p>Jumlah : {transaksi.total_kuantitas}</p>
                      <p>Total harga : {transaksi.total_harga}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </>
    );
  }
}

export default TransactionUser;
