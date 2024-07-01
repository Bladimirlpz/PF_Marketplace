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
    setCarrito((estadoPrevio) => [
      ...estadoPrevio,
      { ...product, cantidad: 1 },
    ]);
  };
  const clearCarrito = (product) => {
    // Encontrar el índice del producto en el carrito
    const index = carrito.findIndex((prod) => prod.id === product.id);
    const currentCantidad = carrito[index].cantidad;

    if (currentCantidad === 1) {

      // Si la cantidad a eliminar es mayor o igual a la cantidad actual del producto

      // Eliminar completamente el producto del carrito
      const newCarrito = carrito.filter((prod) => prod.id !== product.id);
      setCarrito(newCarrito);
    } else {
      // Reducir la cantidad del producto en el carrito
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
