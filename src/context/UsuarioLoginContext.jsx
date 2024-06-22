import { createContext, useState } from "react";

export const UsuarioLoginContext = createContext();

// eslint-disable-next-line react/prop-types
const UsuarioLoginProvider = ({ children }) => {
  const [usuarioLogin, setUsuarioLogin] = useState([]);

  return (
    <UsuarioLoginContext.Provider value={{ usuarioLogin, setUsuarioLogin }}>
      {children}
    </UsuarioLoginContext.Provider>
  );
};

export default UsuarioLoginProvider;
