import React from "react";
import { Col, Card, Row } from "react-bootstrap";

function MenuProduct({ daftarMenu, masukKeranjang }) {
  return (
    <Col md={7} mt={2}>
      <div>
        <h4
          style={{ textAlign: "center", fontWeight: "bold", color: "#594546" }}
        >
          Daftar Produk
        </h4>
        <hr />
        <Row className={`mt-2`}>
          {daftarMenu &&
            daftarMenu.map((menu) => {
              return (
                <Col md={4} xs={6} key={menu.id}>
                  <Card
                    className="shadow"
                    onClick={() => masukKeranjang(menu)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Img
                      variant="top"
                      src={menu.thumbnail}
                      // className="card-img-top"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{menu.title}</Card.Title>
                      <Card.Text>Rp. {menu.harga_jual}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </Col>
  );
}

//  width: 100%;
//   height: 15vw;
//   object-fit: cover;

export default MenuProduct;
