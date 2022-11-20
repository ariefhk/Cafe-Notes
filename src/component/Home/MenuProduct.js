import React from "react";
import { Col, Card, Row, Form } from "react-bootstrap";
import { numberWithCommas } from "../../utils/formatNumber";

function MenuProduct({ searchTerm, handleSearch, daftarMenu, masukKeranjang }) {
  return (
    <Col md={7} mt={2}>
      <Col>
        <h4
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#594546",
          }}
        >
          Daftar Produk
        </h4>
      </Col>
      <hr />
      <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Cari Produk"
            onChange={handleSearch}
            value={searchTerm}
            name="produk"
          />
        </Form.Group>
      </Col>
      {/* className="overflow-auto hasil3" */}
      <Col className="mt-3">
        <div className="overflow-auto hasil3">
          <Row>
            {daftarMenu &&
              daftarMenu.map((menu) => {
                return (
                  <Col className="mt-3" md={4} xs={6} key={menu.id}>
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
                        <Card.Text>
                          Rp. {numberWithCommas(menu.harga_jual)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </Col>
    </Col>
  );
}

//  width: 100%;
//   height: 15vw;
//   object-fit: cover;

export default MenuProduct;
