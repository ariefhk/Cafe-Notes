import React from "react";
import { Col, Card } from "react-bootstrap";

function ShowProduct({ product, handleShow }) {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card
        // style={{ width: "200px" }}
        className="shadow"
        onClick={() => handleShow(product)}
      >
        <Card.Img
          variant="top"
          src={product.thumbnail}
          className="card-img-top"
        />
        <Card.Body>
          <Card.Title>
            <h4>{product.title}</h4>
          </Card.Title>

          <div className="mt-3">
            <p>
              <strong>Id Product</strong> : {product.id}
            </p>
            <p>
              <strong>Stock</strong> : {product.stock}
            </p>
            <p>
              <strong>Harga Beli</strong> : Rp.{product.harga_beli}
            </p>
            <p>
              <strong>Harga Jual</strong> : Rp.{product.harga_jual}
            </p>
          </div>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ShowProduct;
