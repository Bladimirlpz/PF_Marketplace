import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import BarraNav from './components/Navbar';
import Footer from './components/Footer';
import GrillaProductos from './views/GrillaProductos';



function App() {
  

  return (
    <>
      <BarraNav/>
      <GrillaProductos/>
      <Footer/>
    </>
  )
}

export default App
