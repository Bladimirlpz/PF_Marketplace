import { createContext, useState } from 'react'

export const UsuariosContext = createContext()

// eslint-disable-next-line react/prop-types
const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState([])

  return (
    <UsuariosContext.Provider value={{usuario, setUsuario }}>
      { children }
    </UsuariosContext.Provider>
  )
}

export default UsuarioProvider