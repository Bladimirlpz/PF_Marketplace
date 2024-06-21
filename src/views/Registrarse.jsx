import Alert from "./Alerta";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const Registrarse = () => {
  const validName = /^[a-zA-Z]+$/;
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const [error, setError] = useState("");

  const validarInput = (event) => {
    event.preventDefault();
    if (user.nombre === "") {
      return setError("Debes ingresar un nombre");
    } else if (!validName.test(user.nombre)) {
      return setError("Nombre invalido");
    } else if (user.apellido === "") {
      return setError("Debes ingresar un apellido");
    } else if (!validName.test(user.apellido)) {
      return setError("Apellido invalido");
    } else if (user.email === "") {
      return setError("Ingresa un correo");
    } else if (!validEmail.test(user.email)) {
      return setError("Correo Invalido");
    } else if (user.clave === "") {
      return setError("Ingresa una clave");
    } 
    {
      setError("");
    }

    const enviarDatosBack = async () => {
      try {
        const response = await fetch('http://localhost:3000/registrarse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        const respuestaBackend = await response.json();
        if (respuestaBackend.message === "Email ya registrado") {
          window.alert('El email existe inserte otro email.')
        } else {
          window.alert('Usuario registrado con éxito 😀.')
          navigate('/login')
        }
        console.log('Respuesta del backend:', respuestaBackend);
      } catch (error) {
        throw new Error('Hubo un problema al enviar los datos.');
      }
    }
    enviarDatosBack()

  };

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/miPerfil')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
