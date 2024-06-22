import { createContext, useState } from "react";

export const CarritoContext = createContext();

// eslint-disable-next-line react/prop-types
function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

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
    setCarrito(estadoPrevio => ([...estadoPrevio, {...product, cantidad : 1}]))
  };
  const clearCarrito = () => {
    setCarrito([]);
  };
  return (
    <CarritoContext.Provider value={{ carrito, addCarrito, clearCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;
