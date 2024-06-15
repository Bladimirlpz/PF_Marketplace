import Alert from "./Alerta";
import { Button } from "react-bootstrap";
import { useState } from "react";

const PublicarProducto = () => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validarInput = (event) => {
    event.preventDefault();
    if (nombreProducto === "") {
      return setError("Debes ingresar un nombre del producto");
    } else if (descripcion === "") {
      return setError("Debes ingresar una descripcion del producto");
    }  else if (precio === "") {
      return setError("Ingresa el precio del producto");
    }  else if (imagen === "") {
      return setError("Ingresa la imagen del producto");
    } else if (stock === "") {
      return setError("Ingresa la cantidad de productos");
    }

    {
      setError("");
      setSuccess("Publicado con exito!");
    }
  };

  return (
    <div>
      <div className="publicacion">
        <h1>Publicar producto</h1>
        <hr />
        <h3>Características de tu producto</h3>
        <form onSubmit={validarInput} className="publicacion">
          <h5>Nombre del producto</h5>
          <input
            className="inputs"
            type="text"
            placeholder="Nombre del producto"
            onChange={(event) => setNombreProducto(event.target.value)}
          />
          <h5>Descripción</h5>
          <input
            className="inputs"
            type="text"
            placeholder="Descripción del producto"
            onChange={(event) => setDescripcion(event.target.value)}
          />
          <h5>Categoria</h5>
          <select
            className="select"
            type="text"
            onChange={(event) => setPrecio(event.target.value)}
          >
            <option>Hombre</option>
            <option>Mujer</option>
            <option>Electro</option>
            <option>Hogar</option>
          </select>
          <h5>Precio</h5>
          <input
            className="inputs"
            type="number"
            placeholder="1.990"
            onChange={(event) => setPrecio(event.target.value)}
          />
          <h5>Imagen</h5>
          <input
            className="inputs"
            type="img"
            placeholder="URL imagen"
            onChange={(event) => setImagen(event.target.value)}
          />
          <h5>Stock</h5>
          <input
            className="inputs"
            type="number"
            placeholder="Inserte cantidad de productos"
            onChange={(event) => setStock(event.target.value)}
          />
          <Alert error={error} success={success} />

          <Button
            type="submit"
            variant="btn btn-outline-dark"
            onSubmit={validarInput}
          >
            Publicar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PublicarProducto;
