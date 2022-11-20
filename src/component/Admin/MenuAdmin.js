import React from "react";
import { Col, Image } from "react-bootstrap";
import { Profile } from "../../assets";

function MenuAdmin() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <Col md={3} mt={2}>
      <h4 className="judul-color" style={{ textAlign: "center" }}>
        <strong>Data Admin</strong>
      </h4>
      <hr />
      <div
        style={{
          // backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src={Profile} width={`150px`} />
        </div>
        <div>
          <p style={{ fontSize: "18px" }}>
            Nama : <strong>{name}</strong>
          </p>
          <p style={{ fontSize: "15px" }}>
            Email : <strong>{email}</strong>
          </p>
        </div>
      </div>
    </Col>
  );
}

export default MenuAdmin;
