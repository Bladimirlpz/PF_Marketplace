import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";


const BarraNav = () => {
    const navigate = useNavigate()
    const { getUsuario, setUsuario } = useContext([])

    const logout = () => {
        setUsuario()
        window.sessionStorage.removeItem('token')
        navigate('/')
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary text-center  ">
      <Container fluid>
        <Navbar.Brand href="#">Market Place</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-2 mx-auto" navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Productos</Nav.Link>
            <Nav.Link href="#action3">Nosotros</Nav.Link>
            <Nav.Link href="#action4">Contacto</Nav.Link>
          </Nav>
          <div className="buttons text-center d-flex flex-row">
            <Button to="/login" variant="outline-dark m-2">
              <i className="fa fa-sign-in-alt mr-1"></i>Login
            </Button>
            <Button to="/register" variant="outline-dark m-2">
              <i className="fa fa-user-plus mr-1"></i>Registrarse
            </Button>
            <Button to="/carrito" variant="outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i>Carrito
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNav;
