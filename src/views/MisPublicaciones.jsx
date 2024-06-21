import { useContext, useEffect } from "react";
import { MisPublicacionesContext } from "../context/MisPublicacionesContext";
import { Link } from "react-router-dom";
import { UsuarioLoginContext } from "../context/UsuarioLoginContext";

const MisPublicaciones = () => {
  const { apiMisPublicaciones, setApiMisPublicaciones } = useContext(MisPublicacionesContext);
  const { usuarioLogin } = useContext(UsuarioLoginContext)
  
  useEffect(() => {
    const dataPubliciones = async () => {
      const token = window.sessionStorage.getItem('token');
      try {
        if (token) {
          const response = await fetch("http://localhost:3000/mis-publicaciones", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(usuarioLogin)
          });
          const data = await response.json();
          setApiMisPublicaciones(data);
        }
      } catch (error) {
        window.alert("Error de conexion");
      }
    };
    dataPubliciones();
  }, [])

  const EmptyPublicaciones = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No tienes publicaciones</h4>
            <Link to="/perfil" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Mi Perfil
            </Link>
          </div>
        </div>
      </div>
    );
  };



  const Publicaciones = () => {
    return(
    apiMisPublicaciones.length > 0
      ? apiMisPublicaciones.map((ele) => {
          return (
            <div className="container my-5 py-2" key={ele.id}>
              <div className="row">
                <div className="col-md-6 col-sm-12 py-3">
                  <img
                    className="img-fluid"
                    src={ele.image}
                    alt={ele.title}
                    width="400px"
                    height="400px"
                  />
                </div>
                <div className="col-md-6 col-md-6 py-5">
                  <h4 className="text-uppercase text-muted">{ele.category}</h4>
                  <h1 className="display-5">{ele.title}</h1>
                  <h3 className="display-6  my-4">${ele.price}</h3>
                  <p className="lead">{ele.description}</p>
                </div>
              </div>
            </div>
          );
        })
      : null);
  }

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Carrito</h1>
        <hr />
        {usuarioLogin.length > 0 ? <Publicaciones /> : <EmptyPublicaciones />}
      </div>
    </>
  );
};

export default MisPublicaciones;
