import React from "react";
import {
  NavbarComponent,
  ListCategory,
  MenuProduct,
  HasilTransaction,
} from "../component";
import { API_BYID_CATEGORY } from "../utils/byIdCategory";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
// import swal from "sweetalert";

function Home() {
  const [category, setCategory] = useState(1);
  const [daftarMenu, setDaftarMenu] = useState("");
  const [keranjang, setKeranjang] = useState([]);

  const navigate = useNavigate();
  //token
  const token = localStorage.getItem("token");
  axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (!token) {
      navigate(`/login`);
    } else {
      if (category) {
        axios
          .get(API_BYID_CATEGORY + category)
          .then((res) => {
            const data = res.data;
            setDaftarMenu(data.data.products);
            // console.log("data kategori : ", data.data);
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
    }
  }, [category, navigate, token]);

  // Ganti Kategori
  const changeCategory = (category_id) => {
    setCategory(category_id);
  };

  // Masuk Keranjang
  const masukKeranjang = (value) => {
    let checkData = keranjang.find((x) => x.id === value.id);
    if (checkData) {
      return;
    } else {
      let dataKeranjang = [...keranjang];
      let newData = [
        ...dataKeranjang,
        {
          id: value.id,
          jumlah: 1,
          title: value.title,
          harga: value.harga_jual,
        },
      ];
      setKeranjang(newData);
    }
  };

  // Hapus Pesanan
  const hapusPesanan = (pesanan) => {
    setKeranjang(keranjang.filter((item) => item.id !== pesanan.id));
  };

  // Tambah Kuantitas Pesanan
  const tambah = (pesanan) => {
    let checkData = keranjang.find((x) => x.id === pesanan.id);
    if (checkData) {
      // console.log("ada yang samaaaaa tambah!");
      let updateData = keranjang.map((x) =>
        x.id === pesanan.id
          ? {
              ...checkData,
              jumlah: checkData.jumlah + 1,
            }
          : x
      );
      setKeranjang(updateData);
    }
  };

  // Kurangi Kuantitas Pesanan
  const kurang = (pesanan) => {
    let checkData = keranjang.find((x) => x.id === pesanan.id);

    if (checkData) {
      // console.log("ada yang samaaaaa tambah!");
      let updateData = keranjang.map((x) =>
        x.id === pesanan.id ? { ...checkData, jumlah: checkData.jumlah - 1 } : x
      );
      setKeranjang(updateData);
    }
  };

  // Hapus semua item di keranjang
  const handleDeleteAll = () => {
    setKeranjang([]);
  };

  return (
    <div>
      <NavbarComponent />
      <div className={`mt-3 mx-5`}>
        <Row>
          {/* List Category */}
          <ListCategory
            categoriYangDipilih={category}
            changeCategory={changeCategory}
          />
          {/* List Product */}
          <MenuProduct
            daftarMenu={daftarMenu}
            masukKeranjang={masukKeranjang}
          />
          {/* Hasil Transaksi */}
          <HasilTransaction
            keranjang={keranjang}
            hapusPesanan={hapusPesanan}
            kurang={kurang}
            tambah={tambah}
            handleDeleteAll={handleDeleteAll}
          />
        </Row>
      </div>
    </div>
  );
}

export default Home;
