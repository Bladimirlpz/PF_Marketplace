import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CarritoContext = createContext();

// eslint-disable-next-line react/prop-types
function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();
  const addCarrito = (product) => {
    // revisamos si esta el producto en el carro
    const productoEnCarrito = carrito.findIndex(
      (prod) => prod.id === product.id
    );

    if (productoEnCarrito >= 0) {
      const newCarrito = structuredClone(carrito);
      newCarrito[productoEnCarrito].cantidad += 1;
      return setCarrito(newCarrito);
    }
    // Producto no esta en el carrito
    setCarrito((estadoPrevio) => [
      ...estadoPrevio,
      { ...product, cantidad: 1 },
    ]);
    navigate("/carrito");
  };
  const clearCarrito = (product) => {
    const index = carrito.findIndex((prod) => prod.id === product.id);
    const currentCantidad = carrito[index].cantidad;

    if (currentCantidad === 1) {
      const newCarrito = carrito.filter((prod) => prod.id !== product.id);
      setCarrito(newCarrito);
    } else {
      const newCarrito = structuredClone(carrito);
      newCarrito[index].cantidad -= 1;
      setCarrito(newCarrito);
    }
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, setCarrito, addCarrito, clearCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;
