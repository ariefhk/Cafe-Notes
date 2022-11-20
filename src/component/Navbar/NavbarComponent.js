import React from "react";
import { Button, Navbar, Container, Image, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Biji } from "../../assets";
import axios from "axios";
import swal from "sweetalert";
import { API_LOGOUT } from "../../utils/logout";

function NavbarComponent() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [buttonLogin, setButtonLogin] = useState(true);
  const [buttonAdmin, setButtonAdmin] = useState(false);
  // const [buttonHome, setButtonHome] = useState(false);

  useEffect(() => {
    if (!token) {
      setButtonLogin(false);
    } else if (role === "Admin") {
      setButtonAdmin(true);
      setButtonLogin(true);
      // console.log("Token dari navigation : ", token);
    } else if (role === "User") {
      setButtonAdmin(false);
      setButtonLogin(true);
      // console.log("Token dari navigation : ", token);
    }
  }, [token, role]);

  const moveToAdmin = () => {
    navigate(`/admin`);
  };

  const moveToTransaksiUser = () => {
    navigate(`/transaksi`);
  };

  const moveToHome = () => {
    navigate(`/`);
  };

  const logOut = () => {
    if (token) {
      axios
        .post(API_LOGOUT, null, {
          params: {
            token: token,
          },
        })
        .then((res) => {
          const data = res.data;
          // console.log("Sucess Logout :", data);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("name");
          localStorage.removeItem("email");
          setButtonAdmin(false);
          swal({
            title: `Berhasil Log Out`,
            text: `Pesan : ${data.message}`,
            icon: "success",
            button: false,
            timer: 1700,
          });
          navigate(`/login`);
        })
        .catch((error) => {
          console.log("Boo..ERROR:> ", error);
          if (error.response.data.message === "Unauthenticated.") {
            swal({
              title: "Sesi telah berakhir, Silahkan Login kembali!",
              text: `${error.response.data.message}`,
              icon: "error",
              button: false,
              timer: 1700,
            });
            navigate(`/login`);
          }
        });
    }
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#9E7676" }}>
      <Container>
        <Navbar.Brand onClick={() => moveToHome()}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Image src={Biji} width="40px" />
            <div style={{ color: "white" }}>
              <strong>Cafe</strong> Notes
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => moveToTransaksiUser()}>
              Log Transaksi
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div>
          {buttonLogin === true && (
            <Button bg="dark" variant="light" onClick={() => logOut()}>
              Logout
            </Button>
          )}
          {buttonAdmin === true && (
            <Button
              bg="dark"
              variant="light"
              className="mx-3"
              onClick={() => moveToAdmin()}
            >
              Admin
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
