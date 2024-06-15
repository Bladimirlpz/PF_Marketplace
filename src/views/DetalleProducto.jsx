import { useContext, useEffect, useState } from "react";
import { ProductosContext } from "../context/ProductosContext";
import { Link, useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";


const DetalleProducto = () => {
  const [detalle, setDetalle] = useState([])
  const { apiData } = useContext(ProductosContext);
  const { addCarrito } = useContext(CarritoContext)
  const { id } = useParams();

  const filtraProducto = (id) =>{
    const productoFiltrado = apiData.filter((producto) => producto.id === id);
    setDetalle(productoFiltrado)
  }
  useEffect(() => {
    filtraProducto()
  },[])

  
  console.log()
  return (
    
    <div className="container my-5 py-2">
    <div className="row">
      <div className="col-md-6 col-sm-12 py-3">
        <img
          className="img-fluid"
          src={detalle.image}
          alt={detalle.title}
          width="400px"
          height="400px"
        />
      </div>
      <div className="col-md-6 col-md-6 py-5">
        <h4 className="text-uppercase text-muted">{detalle.category}</h4>
        <h1 className="display-5">{detalle.title}</h1>
        <h3 className="display-6  my-4">${detalle.price}</h3>
        <p className="lead">{detalle.description}</p>
        <button
          className="btn btn-outline-dark"
          onClick={()=>addCarrito(detalle)}
        >
          Agregar al carrito
        </button>
        <Link to="/carrito" className="btn btn-dark mx-3">
          Carrito
        </Link>
      </div>
    </div>
  </div>);
};

export default DetalleProducto;
