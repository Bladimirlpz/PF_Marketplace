import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";

export const useCarrito = () => {
    const context = useContext(CarritoContext)
    return context
}

