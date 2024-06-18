import { useContext } from "react";
import { MisPublicacionesContext } from "../context/MisPublicacionesContext";

const MisPublicaciones = () => {
  const { apiMisPublicaciones } = useContext(MisPublicacionesContext);
  
  {
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
};

export default MisPublicaciones;
