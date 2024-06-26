import { useState } from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Alert from "./Alerta";
import { ENDPOINT } from "../config/constans";

const Contacto = () => {
  const [contacto, setContacto] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const handleUser = (event) =>
    setContacto({ ...contacto, [event.target.name]: event.target.value });

  //Funcion para validar imputs
  const validarInput = (event) => {
    event.preventDefault();
    if (contacto.nombre === "") {
      return setError("Nombre Invalido");
    } else if (!validEmail.test(contacto.email)) {
      return setError("Correo invalido");
    } else if (contacto.mensaje === "") {
      return setError("Ingresa tu mensaje");
    }
    {
      setError("");
      setSuccess("Pronto nos contactaremos contigo!!!");
    }

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
          setContacto([]);
        }
      } catch (error) {
        throw new Error("Hubo un problema al enviar los datos.");
      }
    };
    enviarDatosBack();
  };

  return (
    <div
      style={{ width: "100%", height: "55vw" }}
      className="d-flex flex-column align-items-center pt-5 pb-5 "
    >
      <h3>CONTACTANOS</h3>
      <form onSubmit={validarInput} className="publicacion">
        <FloatingLabel
          controlId="floatingTextarea"
          label="Nombre"
          className="mb-3"
          style={{ width: "50%" }}
          value={contacto.nombre}
          onChange={handleUser}
        >
          <Form.Control
            type="text"
            placeholder="Nombre completo"
            name="nombre"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Correo Electronico"
          className="mb-3"
          style={{ width: "50%" }}
          value={contacto.email}
          onChange={handleUser}
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Deja tu mesaje aqui"
          style={{ width: "50%" }}
          value={contacto.mensaje}
          onChange={handleUser}
        >
          <Form.Control
            as="textarea"
            placeholder="Deja tu mesaje aqui"
            style={{ height: "150px" }}
            name="mensaje"
          />
        </FloatingLabel>
        <Alert error={error} success={success} />
        <Button
          type="submit"
          variant="btn btn-outline-dark"
          onSubmit={validarInput}
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default Contacto;
