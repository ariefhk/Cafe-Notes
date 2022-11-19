import React from "react";
import { Row, Image, Form, Button } from "react-bootstrap";
import { Barista, Biji } from "../assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_LOGIN } from "../utils/login";
import axios from "axios";
import swal from "sweetalert";

function Login() {
  const navigate = useNavigate();

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Ini data Login : ", dataLogin);

    axios
      .post(API_LOGIN, dataLogin)
      .then((res) => {
        const data = res.data;
        // console.log("data dari Login :", data.authorisation.token);
        localStorage.setItem("token", data.authorisation.token);
        localStorage.setItem("role", data.user.role);
        swal({
          title: `Selamat Datang`,
          text: `Login sebagai ${data.user.role} : ${data.user.name}`,
          icon: "success",
          button: false,
          timer: 1700,
        });
        navigate(`/`);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    setDataLogin({ email: "", password: "" });
  };

  // handle input
  const changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "email") {
      setDataLogin({ ...dataLogin, email: value });
    } else if (name === "password") {
      setDataLogin({ ...dataLogin, password: value });
    }
  };

  // move to register
  const moveToRegister = () => {
    navigate(`/register`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vm",
        height: "100vh",
      }}
    >
      <Row>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Left Login */}
          <div
            style={{
              backgroundColor: "#9E7676",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              // marginBottom: "-10px",
            }}
          >
            <Image src={Barista} width="350px" />
          </div>

          {/* Right Login */}
          <div
            style={{
              backgroundColor: "#FFF8EA",
              paddingLeft: "50px",
              paddingRight: "50px",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <div
              style={{
                // backgroundColor: "green",
                paddingTop: "10px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Image src={Biji} width="60px" />
              <p
                style={{
                  fontWeight: "bold",
                  color: "#9E7676",
                  fontSize: "20px",
                }}
              >
                Cafe Notes
              </p>
            </div>
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label
                  style={{
                    color: "#9E7676",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={changeHandler}
                  value={dataLogin.email}
                  style={{
                    backgroundColor: "#FFF8EA",
                    borderColor: "#9E7676",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label
                  style={{
                    color: "#9E7676",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  onChange={changeHandler}
                  value={dataLogin.password}
                  name="password"
                  style={{
                    backgroundColor: "#FFF8EA",
                    borderColor: "#9E7676",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </Form.Group>
              <p
                style={{
                  color: "#9E7676",
                  fontSize: "11px",
                  textAlign: "center",
                }}
              >
                Don't have an account?{" "}
                <span
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => moveToRegister()}
                >
                  Register
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#9E7676",
                    borderColor: "#9E7676",
                    padding: "5px 40px",
                    fontSize: "18px",
                    borderRadius: "12px",
                  }}
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Login;
