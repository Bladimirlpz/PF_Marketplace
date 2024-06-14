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


function App() {
  

  return (
    <>
      <ProductosProvider>
      <CarritoProvider>
      <BarraNav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Productos' element={<GrillaProductos/>}/>
          <Route path='/Nosotros' element={<Nosotros/>}/>
          <Route path='/Contacto' element={<Contacto/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Registrarse' element={<Registrarse/>}/>
          <Route path='/Carrito' element={<Carrito/>}/>
        </Routes>
      <Footer/>
      </CarritoProvider>
      </ProductosProvider>
    </>
  )
}

export default App
