import { useContext } from "react";
import { ProductosContext } from "../context/ProductosContext";
import Button from "react-bootstrap/Button";

const Producto = () => {
  const { apiData } = useContext(ProductosContext);

  return (
    <div>
      <div className="filtros">
        <h1>Últimos productos</h1>
        <hr />
        <div>
          <Button variant="outline-dark m-2">Todos</Button>
          <Button variant="outline-dark m-2">Hombre</Button>
          <Button variant="outline-dark m-2">Mujer</Button>
          <Button variant="outline-dark m-2">Joyeria</Button>
          <Button variant="outline-dark m-2">Electronicos</Button>
        </div>
      </div>
      <div className="cards">
      {apiData.length > 0
        ? apiData.map((product) => {
            return (
              <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4 p-2"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <button
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                  >
                    Detalle
                  </button>
                  <button
                    className="btn btn-dark m-1"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
            );
          })
        : null}
        </div>
    </div>
  );
};

export default Producto;
