import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UsuarioLoginContext } from "../context/UsuarioLoginContext";
import { ENDPOINT } from "../config/constans";

const MiPerfil = () => {
  const { usuarioLogin, setUsuarioLogin } = useContext(UsuarioLoginContext);

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
      <h5>Nombre: {usuarioLogin?.nombre}</h5>
      <h5>Apellido: {usuarioLogin?.apellido}</h5>
      <h5>Email: {usuarioLogin?.email}</h5>
      <div className="titulo-usuario">
        <h1>Perfil de Usuario</h1>
        <hr />
        <div className="info">
          <div className="buttons">
            <Link to="/mis-publicaciones">
              <Button variant="btn btn-outline-light w-100">
                Mis Publicaciones
              </Button>
            </Link>
            <Link to="/publicar">
              <Button variant="btn btn-outline-light w-100">
                Publicar productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
