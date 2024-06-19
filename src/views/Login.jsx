import { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alerta';
import { UsuariosContext } from '../context/UsuariosContext';

export default function Login() {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}$"
  );

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { usuario, setUsuario } = useContext(UsuariosContext);

  const handleUser = (event) => setUsuario({ ...usuario, [event.target.name]: event.target.value })

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
    if (usuario.contraseña === "") {
      setError("Ingresa tu contraseña");
      return;
    }
    const enviarDatosBack = async () => {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
        })
        const respuestaBackend = await response.json();
        console.log('Respuesta del backend:', respuestaBackend);
      } catch (error) {
        throw new Error('Hubo un problema al enviar los datos.');
      }
    }
    enviarDatosBack()
    navigate('/contacto')

  };

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/nosotros')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="login">
      <h1>Login</h1>
      <hr />
      <form onSubmit={validLogin} className="login">
        <h5>Email</h5>
        <input
          type="text"
          name='email'
          placeholder="Ingresa tu email"
          onChange={handleUser}
          value={usuario.email}
        />
        <h5>Contraseña</h5>
        <input
          type="password"
          name='contraseña'
          placeholder="Ingresa tu contraseña"
          onChange={handleUser}
          value={usuario.contraseña}
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
