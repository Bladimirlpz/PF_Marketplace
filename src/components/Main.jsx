const Main = () => {
    return (
      <>
        <div className="hero border-1 pb-3">
          <div className="card bg-dark text-white border-0 mx-3">
            <img
              className="card-img img-fluid"
              src="./src/assets/img/main.png.jpg"
              alt="Card"
              height={500}
            />
            <div className="card-img-overlay d-flex align-items-center">
              <div className="container">
                <h5 className="card-title fs-1 text fw-lighter">New Season</h5>
                <p className="card-text fs-5 d-none d-sm-block ">
                Compre productos con Envío Gratis en el día en Marketplace Chile. Encuentre miles de marcas y productos a precios increíbles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Main;