import Alert from "./Alerta";
import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UsuarioLoginContext } from "../context/UsuarioLoginContext";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constans";

const PublicarProducto = () => {
  const { usuarioLogin, setUsuarioLogin } = useContext(UsuarioLoginContext);
  const [producto, setProducto] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleUser = (event) =>
    setProducto({
      ...producto,
      usuario_id: usuarioLogin.id,
      [event.target.name]: event.target.value,
    });

  //Funcion para validar imputs
  const validarInput = (event) => {
    event.preventDefault();
    if (producto.nombre === "") {
      return setError("Debes ingresar un nombre del producto");
    } else if (producto.descripcion === "") {
      return setError("Debes ingresar una descripcion del producto");
    } else if (producto.precio === "") {
      return setError("Ingresa el precio del producto");
    } else if (producto.imagen === "") {
      return setError("Ingresa la imagen del producto");
    } else if (!producto.categoria) {
      return setError("Elija una categoria");
    } else if (producto.stock === "") {
      return setError("Ingresa la cantidad de productos");
    }
    {
      setError("");
      setSuccess("Producto publicado con exito!");
    }

    const enviarDatosBack = async () => {
      const token = window.sessionStorage.getItem("token");
      try {
        const response = await fetch(ENDPOINT.publicar, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        });
        const respuestaBackend = await response.json();
        console.log("Respuesta del backend:", respuestaBackend);
        window.alert("Producto publicado con exito 😀.");
        navigate("/mis-publicaciones");
      } catch (error) {
        throw new Error("Hubo un problema al enviar los datos.");
      }
    };
    enviarDatosBack();
  };

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
        } else {
          navigate("/notFound")
        }
      } catch (error) {
        window.alert("Error de conexion");
      }
    };
    dataToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            onChange={handleUser}
            name="nombre"
            value={producto.nombre}
          />
          <h5>Descripción</h5>
          <input
            className="inputs"
            type="text"
            placeholder="Descripción del producto"
            onChange={handleUser}
            name="descripcion"
            value={producto.descripcion}
          />
          <h5>Categoria</h5>
          <select
            className="select"
            type="text"
            onChange={handleUser}
            value={producto.categoria}
            name="categoria"
            required
          >
            <option selected disabled>Elija una categoria</option>
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
            onChange={handleUser}
            name="precio"
            value={producto.precio}
          />
          <h5>Imagen</h5>
          <input
            className="inputs"
            type="img"
            placeholder="URL imagen"
            onChange={handleUser}
            name="imagen"
            value={producto.imagen}
          />
          <h5>Stock</h5>
          <input
            className="inputs"
            type="number"
            placeholder="Inserte cantidad de productos"
            onChange={handleUser}
            name="stock"
            value={producto.stock}
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
