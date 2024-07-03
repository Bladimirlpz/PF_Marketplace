import { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alerta";
import { UsuariosContext } from "../context/UsuariosContext";
import { ENDPOINT } from "../config/constans";

export default function Login() {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}$"
  );

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVariant, setModalVariant] = useState("");
  const { usuario, setUsuario } = useContext(UsuariosContext);

  const handleUser = (event) =>
    setUsuario({ ...usuario, [event.target.name]: event.target.value });

  const validLogin = (event) => {
    event.preventDefault();
    setError("");

    if (usuario.email === "") {
      setError("Ingresa tu email");
      return;
    }
    if (!validEmail.test(usuario.email)) {
      setError("Correo inválido");
      return;
    }
    if (usuario.contrasena === "") {
      // Cambio aquí para asegurarse de que coincide con el nombre del campo en el estado
      setError("Ingresa tu contraseña");
      return;
    }
    const enviarDatosBack = async () => {
      try {
        const response = await fetch(ENDPOINT.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        });
        const data = await response.json();
        if (data.token) {
          setModalMessage("Usuario identificado con éxito 😀.");
          setModalVariant("success");
          setShowModal(true);
          window.sessionStorage.setItem("token", data.token);
          setTimeout(() => {
            navigate("/perfil");
            setUsuario({ email: "", contrasena: "" });
            setShowModal(false);
          }, 3000);
        } else {
          setModalMessage("Email o contraseña inválida 🙁.");
          setModalVariant("danger");
          setShowModal(true);
        }
      } catch (error) {
        setModalMessage("Error de conexión");
        setModalVariant("danger");
        setShowModal(true);
      }
    };
    enviarDatosBack();
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <hr />
      <form onSubmit={validLogin} className="login">
        <h5>Email</h5>
        <input
          type="text"
          name="email"
          placeholder="Ingresa tu email"
          onChange={handleUser}
          value={usuario.email}
        />
        <h5>Contraseña</h5>
        <input
          type="password"
          name="contrasena" // Cambio aquí para asegurarse de que coincide con el nombre del campo en el estado
          placeholder="Ingresa tu contraseña"
          onChange={handleUser}
          value={usuario.contrasena} // Cambio aquí para asegurarse de que coincide con el nombre del campo en el estado
        />
        {error && <Alert error={error} />}
        <Button type="submit" variant="outline-dark" className="mt-3">
          Ingresar
        </Button>
      </form>
      <h6>
        ¿No tienes cuenta?
        <Link to="/Registrarse" className="links">
          Regístrate
        </Link>
      </h6>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalVariant === "success" ? "Éxito" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
      </Modal>
    </div>
  );
}
