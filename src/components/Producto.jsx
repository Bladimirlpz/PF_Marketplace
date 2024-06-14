import { useContext, useState, useEffect } from "react";
import { ProductosContext } from "../context/ProductosContext.jsx";
import Button from "react-bootstrap/Button";
import { useCarrito } from "../hook/useCarrito.js"

const Producto = () => {
  const { apiData } = useContext(ProductosContext);
  const [filtros, setFiltros] = useState(apiData);
  const { addCarrito } = useCarrito()

  const filterProduct = (cat) => {
    const updatedList = apiData.filter((item) => item.category === cat);
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
            onClick={() => filterProduct("men's clothing")}
          >
            Hombre
          </Button>
          <Button
            variant="outline-dark m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Mujer
          </Button>
          <Button
            variant="outline-dark m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Joyeria
          </Button>
          <Button
            variant="outline-dark m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronicos
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
                      <li className="list-group-item lead">
                        $ {product.price}
                      </li>
                    </ul>
                    <div className="card-body">
                      <button
                        to={"/product/" + product.id}
                        className="btn btn-dark m-1"
                      >
                        Detalle
                      </button>
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
