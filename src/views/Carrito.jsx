import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../hooks/useCarrito";
import { FaRegMinusSquare } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

const Carrito = () => {
  const { carrito, setCarrito, clearCarrito, addCarrito } = useCarrito();
  const navigate = useNavigate();
  // Funcion para manejar el pago
  const handlerPagar = () => {
    // funcion para mandar carrito al backend
    const enviarDatosBack = async () => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      try {
        const response = await fetch("http://localhost:3000/carrito", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carrito),
        });
        const respuestaBackend = await response.json();
        console.log("Respuesta del backend:", respuestaBackend);
        window.alert("Pedido realizado con exito 😀.");
        setCarrito([]);
      } catch (error) {
        throw new Error("Hubo un problema al enviar los datos.");
      }
    };
    enviarDatosBack();
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">El Carrito Esta Vacio</h4>
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
    carrito.map((item) => {
      return (subtotal += item.precio * item.cantidad);
    });

    carrito.map((item) => {
      return (totalItems += item.cantidad);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {carrito.map((item) => {
                      return (
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
                                className="d-flex mb-4"
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

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">
                                    {item.cantidad}
                                  </span>{" "}
                                  x ${item.precio}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
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
                        <span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal)}</strong>
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
    </>
  );
};

export default Carrito;
