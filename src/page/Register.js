import React from "react";
import { Row, Image, Form, Button } from "react-bootstrap";
import { Barista, Biji } from "../assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_REGISTER } from "../utils/register";
import axios from "axios";
import swal from "sweetalert";

function Register() {
  const navigate = useNavigate();

  const [dataRegister, setDataRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(API_REGISTER, dataRegister)
      .then((res) => {
        const data = res.data;
        // console.log("data dari Register :", data);
        swal({
          title: `Berhasil Buat Akun`,
          text: `Akun sebagai ${data.user.role} : ${data.user.name}`,
          icon: "success",
          button: false,
          timer: 1700,
        });
        navigate(`/login`);
      })
      .catch((error) => {
        // console.log("Error yaa ", error);
      });
    setDataRegister({ name: "", email: "", password: "", role: "User" });
  };

  // handle input
  const changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "name") {
      setDataRegister({ ...dataRegister, name: value });
    } else if (name === "email") {
      setDataRegister({ ...dataRegister, email: value });
    } else if (name === "password") {
      setDataRegister({ ...dataRegister, password: value });
    } else if (name === "role") {
      setDataRegister({ ...dataRegister, role: value });
    }
  };

  // move to register
  const moveToLogin = () => {
    navigate(`/login`);
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
          {/* Left Register */}
          <div
            style={{
              backgroundColor: "#9E7676",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              // marginBottom: "-10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src={Barista} width="350px" />
          </div>

          {/* Right Register */}
          <div
            style={{
              backgroundColor: "#FFF8EA",
              paddingLeft: "50px",
              paddingRight: "50px",
              paddingBottom: "20px",
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
              {/* Nama */}
              <Form.Group className="mb-1" controlId="name">
                <Form.Label
                  style={{
                    color: "#9E7676",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  Nama
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  onChange={changeHandler}
                  value={dataRegister.name}
                  style={{
                    backgroundColor: "#FFF8EA",
                    borderColor: "#9E7676",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-1" controlId="email">
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
                  value={dataRegister.email}
                  style={{
                    backgroundColor: "#FFF8EA",
                    borderColor: "#9E7676",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-1" controlId="password">
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
                  value={dataRegister.password}
                  name="password"
                  style={{
                    backgroundColor: "#FFF8EA",
                    borderColor: "#9E7676",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </Form.Group>
              {/* Role */}
              <Form.Group className="mb-1" controlId="role">
                <Form.Label
                  style={{
                    color: "#9E7676",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  Select Role
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="role"
                  onChange={changeHandler}
                  value={dataRegister.role}
                  style={{
                    backgroundColor: "#FFF8EA",
                    borderColor: "#9E7676",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
              </Form.Group>
              <p
                style={{
                  color: "#9E7676",
                  fontSize: "11px",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                Already have an account?{" "}
                <span
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => moveToLogin()}
                >
                  Login
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  // flexDirection: "column",
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
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Register;
