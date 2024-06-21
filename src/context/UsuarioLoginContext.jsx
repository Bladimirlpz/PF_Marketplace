import { createContext,  useEffect,  useState } from "react";

export const UsuarioLoginContext = createContext();

// eslint-disable-next-line react/prop-types
const UsuarioLoginProvider = ({ children }) => {
  const [usuarioLogin, setUsuarioLogin] = useState([]);
  const token = window.sessionStorage.getItem('token');
  
  
  
  useEffect(()=>{
      const dataToken = async () => {
            try {
              if (token) {
                const response = await fetch("http://localhost:3000/usuario", {
                  method: "GET",
                  headers: {
                    "Authorization": `Bearer ${token}`
                  }
                });
                const data = await response.json();
                setUsuarioLogin(data);
            }
        } catch (error) {
            window.alert("Error de conexion");
        }
    };
    dataToken();
},[token])

console.log(usuarioLogin)
   
  return (
    <UsuarioLoginContext.Provider value={{ usuarioLogin, setUsuarioLogin }}>
      {children}
    </UsuarioLoginContext.Provider>
  );
};

export default UsuarioLoginProvider;
