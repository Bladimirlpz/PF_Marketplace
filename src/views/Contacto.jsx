import { useState } from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Alert from "./Alerta";
import { ENDPOINT } from "../config/constans";

const Contacto = () => {
  const [contacto, setContacto] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const handleUser = (event) =>
    setContacto({ ...contacto, [event.target.name]: event.target.value });

  // Funcion para validar inputs
  const validarInput = (event) => {
    event.preventDefault();
    if (contacto.nombre === "") {
      return setError("Nombre Inválido");
    } else if (!validEmail.test(contacto.email)) {
      return setError("Correo inválido");
    } else if (contacto.mensaje === "") {
      return setError("Ingresa tu mensaje");
    }

    setError("");
    setSuccess("Pronto nos contactaremos contigo!!!");

    const enviarDatosBack = async () => {
      try {
        const response = await fetch(ENDPOINT.contacto, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contacto),
        });
        const respuestaBackend = await response.json();
        if (respuestaBackend.message) {
          setContacto({ nombre: "", email: "", mensaje: "" }); // Limpiar campos
        }
      } catch (error) {
        setError("Hubo un problema al enviar los datos.");
      }
    };
    enviarDatosBack();
  };

  return (
    <div className="contacto">
      <h3>CONTACTANOS</h3>
      <form onSubmit={validarInput} className="publicacion contactanos">
        <FloatingLabel
          controlId="floatingTextarea"
          label="Nombre"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Nombre completo"
            name="nombre"
            value={contacto.nombre}
            onChange={handleUser}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Correo Electrónico"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={contacto.email}
            onChange={handleUser}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Déjanos tu mensaje">
          <Form.Control
            as="textarea"
            placeholder="Déjanos tu mensaje aquí"
            name="mensaje"
            value={contacto.mensaje}
            onChange={handleUser}
          />
        </FloatingLabel>
        <Alert error={error} success={success} />
        <Button
          className="btn-enviar"
          type="submit"
          variant="btn btn-outline-dark"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default Contacto;
