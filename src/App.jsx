import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Route, Routes } from "react-router-dom";
import CarritoProvider from "./context/CarritoContext";
import UsuarioProvider from "./context/UsuariosContext";
import ProductosProvider from "./context/ProductosContext";
import UsuarioLoginProvider from "./context/UsuarioLoginContext";
import MisPublicacionesProvider from "./context/MisPublicacionesContext";

import { Producto, BarraNav, Footer } from "./components";
import {
  NotFound,
  Nosotros,
  Contacto,
  MiPerfil,
  Login,
  Home,
  Registrarse,
  Carrito,
  DetalleProducto,
  MisPublicaciones,
  PublicarProducto,
} from "./views";

function App() {
  return (
    <>
      <UsuarioLoginProvider>
        <UsuarioProvider>
          <ProductosProvider>
            <CarritoProvider>
              <MisPublicacionesProvider>
                <BarraNav />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/productos" element={<Producto />} />
                  <Route path="/nosotros" element={<Nosotros />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registrarse" element={<Registrarse />} />
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/:id" element={<DetalleProducto />} />
                  <Route path="/perfil" element={<MiPerfil />} />
                  <Route path="/publicar" element={<PublicarProducto />} />
                  <Route
                    path="/mis-publicaciones"
                    element={<MisPublicaciones />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </MisPublicacionesProvider>
            </CarritoProvider>
          </ProductosProvider>
        </UsuarioProvider>
      </UsuarioLoginProvider>
    </>
  );
}

export default App;
