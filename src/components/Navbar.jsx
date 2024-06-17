//import { useContext } from "react";
//import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const BarraNav = () => {
  //const navigate = useNavigate()
  //const { getUsuario, setUsuario } = useContext([])

  //const logout = () => {
  //setUsuario();
  //window.sessionStorage.removeItem("token");
  //navigate('/')

  return (
    <Navbar expand="lg" className="bg-body-tertiary text-center  ">
      <Container fluid>
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand>Market Place</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-2 mx-auto" navbarScroll>
            <Link to="/">
              <Button variant="link text-decoration-none" className="btn btn-light">
                Home
              </Button>
            </Link>
            <Link to="/productos">
              <Button variant="link text-decoration-none" className="btn btn-light">
                Productos
              </Button>
            </Link>
            <Link to="/nosotros">
              <Button variant="link text-decoration-none" className="btn btn-light">
                Nosotros
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="link text-decoration-none" className="btn btn-light">
                Contacto
              </Button>
            </Link>
          </Nav>
          <div className="buttons text-center d-flex flex-row">
            <Link to="/login">
              <Button variant="outline-dark m-2">
                <i className="fa fa-sign-in-alt mr-1"></i>Login
              </Button>
            </Link>
            <Link to="/registrarse">
              <Button variant="outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i>Registrarse
              </Button>
            </Link>
            <Link to="/carrito">
              <Button variant="outline-dark m-2">
                <i className="fa fa-cart-shopping mr-1"></i>Carrito
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNav;
