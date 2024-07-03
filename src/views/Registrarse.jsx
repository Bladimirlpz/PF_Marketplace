import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alerta";
import { ENDPOINT } from "../config/constans";

const Registrarse = () => {
  const validName = new RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
  );
  const validApellido = new RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
  );
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}$"
  );
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const validarInput = (event) => {
    event.preventDefault();
    if (user.nombre === "") {
      return setError("Debes ingresar un nombre");
    } else if (!validName.test(user.nombre)) {
      return setError("Nombre inválido");
    } else if (user.apellido === "") {
      return setError("Debes ingresar un apellido");
    } else if (!validApellido.test(user.apellido)) {
      return setError("Apellido inválido");
    } else if (user.email === "") {
      return setError("Ingresa un correo");
    } else if (!validEmail.test(user.email)) {
      return setError("Correo inválido");
    } else if (user.contraseña === "") {
      return setError("Ingresa una contraseña");
    }
    setError("");

    const enviarDatosBack = async () => {
      try {
        const response = await fetch(ENDPOINT.registrase, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const respuestaBackend = await response.json();
        if (respuestaBackend.message === "Email ya registrado") {
          setModalMessage("El email ya existe. Inserte otro email.");
          setShowModal(true);
        } else {
          setModalMessage("Usuario registrado con éxito 😀.");
          setShowModal(true);
        }
      } catch (error) {
        setModalMessage("Hubo un problema al enviar los datos.");
        setShowModal(true);
      }
    };
    enviarDatosBack();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage === "Usuario registrado con éxito 😀.") {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      navigate("/miPerfil");
    }
  }, [navigate]);

  return (
    <div>
      <div className="register">
        <h1>Ingresa tus datos</h1>
        <hr />
        <form onSubmit={validarInput} className="register">
          <h5>Nombre</h5>
          <input
            className="inputs"
            type="text"
            placeholder="Nombre"
            onChange={handleUser}
            value={user.nombre}
            name="nombre"
          />
          <h5>Apellido</h5>
          <input
            className="inputs"
            type="text"
            placeholder="Apellido"
            onChange={handleUser}
            value={user.apellido}
            name="apellido"
          />
          <h5>Email</h5>
          <input
            className="inputs"
            type="text"
            placeholder="tuEmail@ejemplo.com"
            onChange={handleUser}
            value={user.email}
            name="email"
          />
          <h5>Contraseña</h5>
          <input
            className="inputs"
            type="password"
            placeholder="Contraseña"
            onChange={handleUser}
            value={user.contraseña}
            name="contraseña"
          />
          <Alert error={error} />
          <h6>
            ¿Ya tienes cuenta?
            <Link to="/login" className="links">
              Login
            </Link>
          </h6>
          <Button type="submit" variant="btn btn-outline-dark">
            Registrar
          </Button>
        </form>
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
    </div>
  );
};

export default Registrarse;
