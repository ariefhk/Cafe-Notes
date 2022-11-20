import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ALL_CATEGORY } from "../../utils/allCategory";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ListCategory({ categoriYangDipilih, changeCategory }) {
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
        } else {
          console.log("errornya agak laen=>", error);
        }
      });
  }, [navigate]);

  // console.log("from listCategory", categories);

  return (
    <Col md={2} mt={2}>
      <div>
        <h4
          style={{ textAlign: "center", fontWeight: "bold", color: "#594546" }}
        >
          Daftar Kategori
        </h4>
      </div>
      <hr />
      <ListGroup className={`mt-2`}>
        {categories &&
          categories.map((category) => {
            return (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.id)}
                className={
                  categoriYangDipilih === category.id
                    ? "category-aktif"
                    : "category-nonAktif"
                }
                style={{ cursor: "pointer" }}
              >
                {category.name}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Col>
  );
}

export default ListCategory;
