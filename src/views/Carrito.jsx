import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../hooks/useCarrito";
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import { ENDPOINT } from "../config/constans";

const Carrito = () => {
  const { carrito, setCarrito, clearCarrito, addCarrito } = useCarrito();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Función para manejar el pago
  const handlerPagar = () => {
    const enviarDatosBack = async () => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(ENDPOINT.cart, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carrito),
        });
        await response.json();
        setModalMessage("Pedido realizado con éxito 😀.");
        setShowModal(true);
        setCarrito([]);
      } catch (error) {
        setModalMessage("Hubo un problema al enviar los datos.");
        setShowModal(true);
      }
    };
    enviarDatosBack();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">El Carrito Está Vacío</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;
    carrito.forEach((item) => {
      subtotal += item.precio * item.cantidad;
    });

    carrito.forEach((item) => {
      totalItems += item.cantidad;
    });

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Productos</h5>
                  </div>
                  <div className="card-body">
                    {carrito.map((item) => (
                      <div key={item.id}>
                        <div className="row d-flex align-items-center">
                          <div className="col-lg-3 col-md-12">
                            <div
                              className="bg-image rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={item.imagen}
                                alt={item.nombre_producto}
                                width={100}
                                height={75}
                              />
                            </div>
                          </div>

                          <div className="col-lg-5 col-md-6">
                            <p>
                              <strong>{item.nombre_producto}</strong>
                            </p>
                          </div>

                          <div className="col-lg-4 col-md-6">
                            <div
                              className="d-flex mb-4 align-items-center"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn px-1"
                                onClick={() => {
                                  clearCarrito(item);
                                }}
                              >
                                <FaRegMinusSquare />
                              </button>

                              <p className="mx-5">{item.cantidad}</p>

                              <button
                                className="btn px-1"
                                onClick={() => {
                                  addCarrito(item);
                                }}
                              >
                                <FaRegPlusSquare />
                              </button>
                            </div>

                            <p className="text-start text-md-center mb-0 mb-3">
                              <strong>
                                <span className="text-muted">
                                  {item.cantidad}
                                </span>{" "}
                                x {formatCurrency(item.precio)}
                              </strong>
                            </p>
                          </div>
                        </div>

                        <hr className="my-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Resumen del pedido</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Productos ({totalItems})
                        <span>{formatCurrency(Math.round(subtotal))}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total</strong>
                        </div>
                        <span>
                          <strong>
                            {formatCurrency(Math.round(subtotal))}
                          </strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      className="btn btn-dark btn-lg btn-block"
                      onClick={handlerPagar}
                    >
                      Ir a pagar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Carrito</h1>
        <hr />
        {carrito.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Carrito;
