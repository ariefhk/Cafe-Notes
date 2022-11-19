import React from "react";
import { Col, ListGroup, Badge, Card } from "react-bootstrap";
import TotalBayar from "./TotalBayar";
import { Button } from "react-bootstrap";
import { faPlus, faTrash, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HasilTransaction({
  keranjang,
  hapusPesanan,
  tambah,
  kurang,
  harga,
  handleDeleteAll,
}) {
  return (
    <Col md={3} mt={2}>
      <div>
        <h4
          style={{ textAlign: "center", fontWeight: "bold", color: "#594546" }}
        >
          Hasil
        </h4>
      </div>
      <hr />
      {keranjang.length !== 0 && (
        <Card className="overflow-auto hasil mt-3">
          <ListGroup variant="flush">
            {keranjang.map((pesanan) => {
              return (
                <ListGroup.Item key={pesanan.id}>
                  <div
                    style={{
                      display: "flex",
                      gap: 30,
                      // backgroundColor: "green",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* Badge */}
                    <div>
                      <h5>
                        <Badge
                          pill
                          bg="secondary"
                          // style={{ backgroundColor: "#594546" }}
                        >
                          {pesanan.jumlah}
                        </Badge>
                      </h5>
                    </div>
                    {/* Pesanan */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p style={{ fontWeight: "bold" }}>{pesanan.title}</p>
                      <p>Rp.{pesanan.harga}</p>
                    </div>
                    {/* hapus pesanan */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 10,
                        }}
                      >
                        <Button
                          size="sm"
                          style={{
                            backgroundColor: "#9e7676",
                            borderColor: "#9e7676",
                          }}
                          onClick={() => kurang(pesanan)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <Button
                          size="sm"
                          style={{
                            backgroundColor: "#9e7676",
                            borderColor: "#9e7676",
                          }}
                          onClick={() => tambah(pesanan)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        className={`mt-2`}
                        onClick={() => hapusPesanan(pesanan)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>
                  {/* <hr /> */}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      )}
      <TotalBayar keranjang={keranjang} handleDeleteAll={handleDeleteAll} />
    </Col>
  );
}

export default HasilTransaction;
