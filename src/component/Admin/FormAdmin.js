import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
// import { API_BYID_CATEGORY } from "../../utils/byIdCategory";
import { API_ALL_CATEGORY } from "../../utils/allCategory";

function FormAdmin({ category, changeHandler }) {
  const [categories, setCategories] = useState("");

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
        console.log("Error yaa ", error);
      });
  }, []);

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
