// import { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { UsuariosContext } from "../context/UsuariosContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MiPerfil = () => {
  // const { usuarios } = useContext(UsuariosContext);
  // const { nombre } = useParams();

  // const usuario = usuarios.find((user) => user.nombre === nombre);

  // if (!usuario) {
  //   return <p>Usuario no encontrado</p>;
  // }

  return (
    <div className="mi-perfil">
      {/* <h1>Perfil de {usuario.nombre}</h1>
      <h5>Nombre: {usuario.nombre}</h5>
      <>Apellido: {usuario.apellido}</h5>
      <h5>Email: {usuario.email}</h5> */}
      <div className="titulo-usuario">
        <h1>Perfil de Usuario</h1>
        <hr />
        <div className="info">
          <h5>Nombre: Usuario</h5>
          <h5>Apellido: Usuario</h5>
          <h5>Email: Usuario</h5>
          <div className="buttons">
            <Link to="/mis-publicaciones">
              <Button variant="btn btn-outline-light">Ver mis productos</Button>
            </Link>
            <Link to="/publicar">
              <Button variant="btn btn-outline-light">Publicar productos</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
