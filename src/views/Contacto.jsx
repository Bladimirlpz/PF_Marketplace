import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Contacto = () => {
  return (
    <div
      style={{ width: "100%", height: "55vw" }}
      className="d-flex flex-column align-items-center pt-5 pb-5 "
    >
      <h3>CONTACTANOS</h3>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Nombre"
        className="mb-3"
        style={{ width: "50%" }}
      >
        <Form.Control type="text" placeholder="Nombre completo" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Correo Electronico"
        className="mb-3"
        style={{ width: "50%" }}
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>

      <FloatingLabel 
        controlId="floatingTextarea2" 
        label="Deja tu mesaje aqui"
        style={{ width: "50%" }}
        >
        
        <Form.Control
          as="textarea"
          placeholder="Deja tu mesaje aqui"
          style={{ height: "150px"}}
        />
      </FloatingLabel>
    </div>
  );
};

export default Contacto;
