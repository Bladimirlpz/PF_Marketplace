import { useEffect, useState, createContext } from "react";
 
const url = "https://fakestoreapi.com/products/3"

export const MisPublicacionesContext = createContext()

// eslint-disable-next-line react/prop-types
function MisPublicacionesProvider({ children }) {
    const [apiMisPublicaciones, setApiMisPublicaciones] = useState([])

    const apiInfo = async () => {
        try {
            const res = await fetch(url)
            const data = await res.json()
            setApiMisPublicaciones(data)
        } catch (error) {
            alert("Error Api");
        }
    }


useEffect (()=> {
    apiInfo()
}, [])

return (
    <MisPublicacionesContext.Provider value={{apiMisPublicaciones, setApiMisPublicaciones}}>
        {children}
    </MisPublicacionesContext.Provider>
)
}

export default MisPublicacionesProvider