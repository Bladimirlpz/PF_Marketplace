import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import BarraNav from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import GrillaProductos from "./views/GrillaProductos";
import Nosotros from "./views/Nosotros";
import Contacto from "./views/Contacto";
import Login from "./views/Login";
import Registrarse from "./views/Registrarse";
import Carrito from "./views/Carrito";
import ProductosProvider from "./context/ProductosContext";
import CarritoProvider from "./context/CarritoContext";
import DetalleProducto from "./views/DetalleProducto";
import MisPublicaciones from "./views/MisPublicaciones";
import MisPublicacionesProvider from "./context/MisPublicacionesContext";
import NotFound from "./views/NotFound";
import MiPerfil from "./views/MiPerfil";
import PublicarProducto from "./views/PublicarProducto";
import UsuarioProvider from "./context/UsuariosContext";
import UsuarioLoginProvider from "./context/UsuarioLoginContext";

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
                  <Route path="/productos" element={<GrillaProductos />} />
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
