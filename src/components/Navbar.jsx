import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UsuarioLoginContext } from "../context/UsuarioLoginContext";
import { CarritoContext } from "../context/CarritoContext";
import { ENDPOINT } from "../config/constans";

const BarraNav = () => {
  const navigate = useNavigate();
  const { usuarioLogin, setUsuarioLogin } = useContext(UsuarioLoginContext);
  const { clearCarrito } = useContext(CarritoContext);
  
  useEffect(() => {
    const dataToken = async () => {
      const token = window.sessionStorage.getItem("token");
      try {
        if (token) {
          const response = await fetch(ENDPOINT.user, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUsuarioLogin(data);
        }
      } catch (error) {
        window.alert("Error de conexion");
      }
    };
    dataToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    setUsuarioLogin([]);
    clearCarrito();
    navigate("/");
  };

  const isLogin = () => {
    if (usuarioLogin.length === 0) {
      return (
        <>
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
        </>
      );
    }
    return (
      <>
        <Link to="/perfil">
          <Button variant="outline-dark m-2">
            <i className="fa fa-sign-in-alt mr-1"></i>Mi Perfil
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline-dark m-2" onClick={logout}>
            Salir
          </Button>
        </Link>
        <Link to="/carrito">
          <Button variant="outline-dark m-2">
            <i className="fa fa-cart-shopping mr-1"></i>Carrito
          </Button>
        </Link>
      </>
    );
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary text-center container ">
      <Container fluid>
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand>Market Place</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-2 mx-auto" navbarScroll>
            <Link to="/">
              <Button className="btn btn-light">Home</Button>
            </Link>
            <Link to="/productos">
              <Button className="btn btn-light">Productos</Button>
            </Link>
            <Link to="/nosotros">
              <Button className="btn btn-light">Nosotros</Button>
            </Link>
            <Link to="/contacto">
              <Button className="btn btn-light">Contacto</Button>
            </Link>
          </Nav>
          <div className="buttons text-center d-flex flex-row">{isLogin()}</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNav;
