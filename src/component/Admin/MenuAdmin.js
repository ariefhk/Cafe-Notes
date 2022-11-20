import React from "react";
import { Col, Image } from "react-bootstrap";
import { Profile } from "../../assets";

function MenuAdmin({ menuDipilih, handleMenu }) {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const menu = [
    {
      id: 1,
      page: "produk",
    },
    {
      id: 2,
      page: "home",
    },
  ];

  return (
    <Col md={3} mt={2}>
      <h4 className="judul-color" style={{ textAlign: "center" }}>
        <strong>Admin</strong>
      </h4>
      <hr />
      {/* <ListGroup>
        {menu &&
          menu.map((menus) => {
            return (
              <ListGroup.Item
                key={menus.id}
                onClick={() => handleMenu(menus.page)}
                className={
                  menuDipilih === menus.page
                    ? "category-aktif"
                    : "category-nonAktif"
                }
                style={{ cursor: "pointer" }}
              >
                {menus.page}
              </ListGroup.Item>
            );
          })}
      </ListGroup> */}
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
