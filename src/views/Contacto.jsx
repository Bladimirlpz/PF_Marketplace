import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Contacto = () => {
  return (
    <div style={{width: "50%" }}>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Nombre"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Nombre completo" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Correo Electronico"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea2" label="Deja tu mesaje aqui">
        <Form.Control
          as="textarea"
          placeholder="Deja tu mesaje aqui"
          style={{ height: "150px" }}
        />
      </FloatingLabel>
    </div>
  );
};

export default Contacto;
