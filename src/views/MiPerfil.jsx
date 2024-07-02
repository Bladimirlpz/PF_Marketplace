import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioLoginContext } from "../context/UsuarioLoginContext";
import { ENDPOINT } from "../config/constans";
import "../assets/css/perfil.css";

const MiPerfil = () => {
  const { usuarioLogin, setUsuarioLogin } = useContext(UsuarioLoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    const dataToken = async () => {
      const token = window.sessionStorage.getItem("token");
      try {
        if (token) {
          const response = await fetch(ENDPOINT.user, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUsuarioLogin(data);
        } else {
          navigate("/notFound");
        }
      } catch (error) {
        window.alert("Error de conexion");
      }
    };
    dataToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mi-perfil">
      <h1>Perfil de {usuarioLogin?.nombre}</h1>
      <div className="titulo-usuario">
        <div className="datos-usuario mt-3">
          <h1>Datos de Usuario</h1>
          <h5>Nombre: {usuarioLogin?.nombre}</h5>
          <h5>Apellido: {usuarioLogin?.apellido}</h5>
          <h5>Email: {usuarioLogin?.email}</h5>
        </div>
      </div>
      <div className="buttons">
        <Link to="/mis-publicaciones" className="link">
          <Button variant="btn m-2 btn-outline-light" className="button">
            Mis Publicaciones
          </Button>
        </Link>
        <Link to="/publicar" className="link">
          <Button variant="btn m-2 btn-outline-light" className="button">
            Publicar productos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MiPerfil;
