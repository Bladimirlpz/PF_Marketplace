import { useContext, useEffect, useState } from "react";
import { MisPublicacionesContext } from "../context/MisPublicacionesContext";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Toast, ToastContainer } from "react-bootstrap";
import { ENDPOINT } from "../config/constans";

const MisPublicaciones = () => {
  const { apiMisPublicaciones, setApiMisPublicaciones } = useContext(
    MisPublicacionesContext
  );
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const dataPublicaciones = async () => {
    const token = window.sessionStorage.getItem("token");
    try {
      if (token) {
        const response = await fetch(ENDPOINT.misPublicaciones, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setApiMisPublicaciones(data);
      } else {
        navigate("/notFound");
      }
    } catch (error) {
      setToastMessage("Error de conexion");
      setShowToast(true);
    }
  };

  useEffect(() => {
    dataPublicaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEliminar = async () => {
    const token = window.sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${ENDPOINT.misPublicaciones}/${selectedId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setToastMessage("Publicación eliminada con éxito.");
        await dataPublicaciones();
      } else {
        setToastMessage("No se pudo eliminar la publicación");
      }
    } catch (error) {
      setToastMessage("Error de conexion");
    } finally {
      setShowModal(false);
      setSelectedId(null);
      setShowToast(true);
    }
  };

  const handleShowModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const EmptyPublicaciones = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No tienes publicaciones</h4>
            <Link to="/perfil" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Mi Perfil
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const Publicaciones = () => {
    return (
      <div className="d-flex flex-wrap w-auto p-1">
        {apiMisPublicaciones?.length > 0
          ? apiMisPublicaciones.map((ele) => {
              return (
                <div
                  id={ele.id}
                  key={ele.id}
                  className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4 p-3"
                >
                  <div className="card text-center h-100">
                    <img
                      className="card-img-top p-3"
                      src={ele.imagen}
                      alt="Card"
                      height={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{ele.nombre_producto}...</h5>
                      <p className="card-text">{ele.descripcion}...</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item lead">$ {ele.precio}</li>
                    </ul>
                    <div className="card-body">
                      <Link to={"/" + ele.id}>
                        <button className="btn btn-dark m-1">Detalle</button>
                      </Link>
                      <button
                        className="btn btn-dark m-1"
                        onClick={() => handleShowModal(ele.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Mis Publicaciones</h1>
        <hr />
        {apiMisPublicaciones.length > 0 ? (
          <Publicaciones />
        ) : (
          <EmptyPublicaciones />
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta publicación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notificación</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default MisPublicaciones;
