import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
// import { API_BYID_CATEGORY } from "../../utils/byIdCategory";
import { API_ALL_CATEGORY } from "../../utils/allCategory";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function FormAdmin({ category, changeHandler }) {
  const [categories, setCategories] = useState("");
  const navigate = useNavigate();

  // token
  const token = localStorage.getItem("token");
  axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(API_ALL_CATEGORY)
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setCategories(data.data);
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
  }, [navigate]);

  return (
    <Form.Select
      aria-label="Default select example"
      value={category}
      onChange={changeHandler}
    >
      {/* <option value="1">Makanan</option>
      <option value="2">Minuman</option> */}
      {categories &&
        categories.map((value) => {
          return (
            <option key={value.id} value={value.id}>
              {value.name}
            </option>
          );
        })}
    </Form.Select>
  );
}

export default FormAdmin;
