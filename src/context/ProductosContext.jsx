import { useEffect, useState, createContext } from "react";
import { ENDPOINT } from "../config/constans";


export const ProductosContext = createContext()

// eslint-disable-next-line react/prop-types
function ProductosProvider({ children }) {
    const [apiData, setApiData] = useState([])

    const apiInfo = async () => {
        try {
            const res = await fetch(ENDPOINT.productos)
            const data = await res.json()
            setApiData(data)
        } catch (error) {
            alert("Error Api");
        }
    }

useEffect (()=> {
    apiInfo()
}, [])

return (
    <ProductosContext.Provider value={{apiData, setApiData}}>
        {children}
    </ProductosContext.Provider>
)
}

export default ProductosProvider