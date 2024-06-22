import { Link } from "react-router-dom";
const NotFound = () => {
    return(
        <div className="notFound">
            <h1>Pagina No Encontrada :(</h1>
            <h1>Para volver al inicio pulsa <Link to="/" className="links">Aqui</Link></h1>
        </div>
    )
  };
  
  export default NotFound
  