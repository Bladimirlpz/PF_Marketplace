import Alert from "./Alerta";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";

const Registrarse = () => {
  const validName = /^[a-zA-Z]+$/;
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validarInput = (event) => {
    event.preventDefault();
    if (nombre === "") {
      return setError("Debes ingresar un nombre");
    } else if (!validName.test(nombre)) {
      return setError("Nombre invalido");
    } else if (apellido === "") {
      return setError("Debes ingresar un apellido");
    } else if (!validName.test(apellido)) {
      return setError("Apellido invalido");
    } else if (email === "") {
      return setError("Ingresa un correo");
    } else if (!validEmail.test(email)) {
      return setError("Correo Invalido");
    } else if (clave === "") {
      return setError("Ingresa una clave");
    }

    {
      setError("");
      setSuccess("Registrado con exito!");
    }
  };

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
            onChange={(event) => setNombre(event.target.value)}
          />
          <h5>Apellido</h5>
          <input
            className="inputs"
            type="text"
            placeholder="Apellido"
            onChange={(event) => setApellido(event.target.value)}
          />
          <h5>Email</h5>
          <input
            className="inputs"
            type="text"
            placeholder="tuEmail@ejemplo.com"
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Contraseña</h5>
          <input
            className="inputs"
            type="password"
            value={clave}
            placeholder="Contraseña"
            onChange={(event) => setClave(event.target.value)}
          />
          <Alert error={error} success={success} />
          <h6>
            Ya tienes cuenta?
            <Link to="/login" className="links">Login</Link>
          </h6>
          <Button
            type="submit"
            variant="btn btn-outline-dark"
            onSubmit={validarInput}
          >
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;
