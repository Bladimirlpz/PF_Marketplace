import { useState, createContext } from "react";
export const MisPublicacionesContext = createContext();

// eslint-disable-next-line react/prop-types
function MisPublicacionesProvider({ children }) {
  const [apiMisPublicaciones, setApiMisPublicaciones] = useState([]);

  return (
    <MisPublicacionesContext.Provider
      value={{ apiMisPublicaciones, setApiMisPublicaciones }}
    >
      {children}
    </MisPublicacionesContext.Provider>
  );
}

export default MisPublicacionesProvider;
