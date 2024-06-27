import { useContext, useEffect } from "react";
import { MisPublicacionesContext } from "../context/MisPublicacionesContext";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../config/constans";

const MisPublicaciones = () => {
  const { apiMisPublicaciones, setApiMisPublicaciones } = useContext(
    MisPublicacionesContext
  );

  const dataPublicaciones = async () => {
    const token = window.sessionStorage.getItem("token");
    try {
      if (token) {
        const response = await fetch(ENDPOINT.misPublicaciones, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setApiMisPublicaciones(data);
      }
    } catch (error) {
      window.alert("Error de conexion");
    }
  };
  useEffect(() => {
    dataPublicaciones();
  }, []);

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
    return (
      <div className="d-flex flex-wrap w-auto p-1">
        {apiMisPublicaciones?.length > 0
          ? apiMisPublicaciones.map((ele) => {
              return (
                <div
                  id={ele.id}
                  key={ele.id}
                  className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4 p-3"
                >
                  <div className="card text-center h-100" key={ele.id}>
                    <img
                      className="card-img-top p-3"
                      src={ele.imagen}
                      alt="Card"
                      height={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{ele.nombre_producto}...</h5>
                      <p className="card-text">{ele.descripcion}...</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item lead">$ {ele.precio}</li>
                    </ul>
                    <div className="card-body">
                      <Link to={"/" + ele.id}>
                        <button className="btn btn-dark m-1">Detalle</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        ;
      </div>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Mis Publicaciones</h1>
        <hr />
        {apiMisPublicaciones.length > 0 ? (
          <Publicaciones />
        ) : (
          <EmptyPublicaciones />
        )}
      </div>
    </>
  );
};

export default MisPublicaciones;
