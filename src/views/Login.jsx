import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Alert from "./Alerta";
import { useState } from "react";

const Login = () => {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}$"
  );
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const validLogin = (event) => {
    event.preventDefault();
    if (email === "") {
      return setError("Ingresa datos");
    } else if (!validEmail.test(email)) {
      return setError("Correo Invalido");
    } else if (clave === "") {
      return setError("Ingresa la contraseña");
    }
    {
      setError("");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <hr />
      <form onSubmit={validLogin} className="login">
        <h5>Email</h5>
        <input
          type="text"
          placeholder="Ingresa tu email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <h5>Contraseña</h5>
        <input
          type="password"
          value={clave}
          placeholder="Ingresa tu contraseña"
          onChange={(event) => setClave(event.target.value)}
        />
        <Alert error={error}/>
        <Button type="submit" variant="btn btn-outline-dark">
          Ingresar
        </Button>
      </form>
      <h6>
        No tienes cuenta? <Link to="/Registrarse">Registrate</Link>
      </h6>
    </div>
  );
};

export default Login;
