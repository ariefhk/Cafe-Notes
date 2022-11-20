import React from "react";
import { Row } from "react-bootstrap";
import { MenuAdmin, NavbarComponent, ProductAdmin } from "../component";
import { useState } from "react";

function Admin() {
  const [menuDipilih, setMenuDipilih] = useState("produk");

  const handleMenu = (page) => {
    setMenuDipilih(page);
  };

  return (
    <div>
      <NavbarComponent />
      <div className={`mt-3 mx-5`}>
        <Row>
          <MenuAdmin menuDipilih={menuDipilih} handleMenu={handleMenu} />
          <ProductAdmin />
        </Row>
      </div>
    </div>
  );
}

export default Admin;
