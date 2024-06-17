import { createContext, useState, useEffect } from "react";


export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  
  const url = "../assets/json/usuarios.json";

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Error al obtener usuarios");
        }
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    obtenerUsuarios();
  }, []);


  return (
    <UsuariosContext.Provider value={{ usuarios }}>
      {children}
    </UsuariosContext.Provider>
  );
};
