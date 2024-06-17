import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alerta';
import { UsuariosContext } from '../context/UsuariosContext';

export default function Login() {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}$"
  );

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const { usuarios } = useContext(UsuariosContext);

  const validLogin = (event) => {
    event.preventDefault();
    setError("");

    if (email === "") {
      setError("Ingresa tu email");
      return;
    }
    if (!validEmail.test(email)) {
      setError("Correo inválido");
      return;
    }
    if (contraseña === "") {
      setError("Ingresa tu contraseña");
      return;
    }

    const usuario = usuarios.find(
      (user) => user.email === email || user.contraseña === contraseña
    );
    
    if (usuario) {
      navigate(`/perfil/${usuario.id}`);
    } else {
      setError("Credenciales incorrectas");
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
          value={email}
        />
        <h5>Contraseña</h5>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          onChange={(event) => setContraseña(event.target.value)}
          value={contraseña}
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
    </div>
  );
}
