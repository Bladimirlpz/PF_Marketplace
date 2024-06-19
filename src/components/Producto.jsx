import { useContext, useState, useEffect } from "react";
import { ProductosContext } from "../context/ProductosContext.jsx";
import Button from "react-bootstrap/Button";
import { useCarrito } from "../hooks/useCarrito.js"
import { Link } from "react-router-dom";


const Producto = () => {
  const { apiData } = useContext(ProductosContext);
  const [filtros, setFiltros] = useState(apiData);
  const { addCarrito } = useCarrito()

  const filterProduct = (cat) => {
    const updatedList = apiData.filter((item) => item.categoria === cat);
    setFiltros(updatedList);
  };
  
  //Agregar productos al carrito
  useEffect(() => {
    
      if (apiData.length > 0) {  
        setFiltros(apiData); 
      }
    }
  , [apiData]);

  return (
    <div>
      <div className="filtros">
        <h1>Últimos productos</h1>
        <hr />
        <div>
          <Button
            variant="outline-dark m-2"
            onClick={() => setFiltros(apiData)}
          >
            Todos
          </Button>
          <Button
            variant="outline-dark m-2"
            onClick={() => filterProduct("Hombre")}
          >
            Hombre
          </Button>
          <Button
            variant="outline-dark m-2"
            onClick={() => filterProduct("Mujer")}
          >
            Mujer
          </Button>
          <Button
            variant="outline-dark m-2"
            onClick={() => filterProduct("Electro")}
          >
            Electronica
          </Button>
        </div>
      </div>
      <div className="cards">
        {apiData.length > 0
          ? filtros.map((product) => {
              return (
                <div
                  id={product.id}
                  key={product.id}
                  className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4 p-2"
                >
                  <div className="card text-center h-100" key={product.id}>
                    <img
                      className="card-img-top p-3"
                      src={product.imagen}
                      alt="Card"
                      height={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.nombre_producto}...
                      </h5>
                      <p className="card-text">
                        {product.descripcion}...
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item lead">
                        $ {product.precio}
                      </li>
                    </ul>
                    <div className="card-body">
                      <Link to={"/" + product.id}>
                      <button
                        className="btn btn-dark m-1"
                      >
                        Detalle
                      </button></Link>
                      <button className="btn btn-dark m-1" onClick={()=>addCarrito(product)}>
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
