import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import BarraNav from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import GrillaProductos from './views/GrillaProductos';
import Nosotros from './views/Nosotros'
import Contacto from './views/Contacto'
import Login from './views/Login'
import Registrarse from './views/Registrarse'
import Carrito from './views/Carrito'
import ProductosProvider from './context/ProductosContext';
import CarritoProvider from './context/CarritoContext';
import DetalleProducto from './views/DetalleProducto'
import NotFound from './views/NotFound'
import { UsuariosProvider } from './context/UsuariosContext';
import MiPerfil from './views/MiPerfil';
import PublicarProducto from './views/PublicarProducto'
import MisPublicaciones from './views/MisPublicaciones'


function App() {
  

  return (
    <>
    <UsuariosProvider>
      <ProductosProvider>
      <CarritoProvider>
      <BarraNav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/productos' element={<GrillaProductos/>}/>
          <Route path='/nosotros' element={<Nosotros/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registrarse' element={<Registrarse/>}/>
          <Route path='/carrito' element={<Carrito/>}/>
          <Route path='/producto/:id' element={<DetalleProducto/>}/>
          <Route path='/perfil' element={<MiPerfil/>}/>
          <Route path='/publicar' element={<PublicarProducto/>}/>
          <Route path='/mis-publicaciones' element={<MisPublicaciones/>}/>
          {/* <Route path='/perfil/:id' element={<MiPerfil/>}/> */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      <Footer/>
      </CarritoProvider>
      </ProductosProvider>
    </UsuariosProvider>
    </>
  )
}

export default App
