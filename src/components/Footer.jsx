const Footer = () => {
  return (
    <>
      <footer className="footer_div">
        <div className="d-flex align-items-center justify-content-center pb-1">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">
              Realizado por generacion Bladimir Lopez{" "}
              <a
                href="https://github.com/"
                className="links fs-5"
                target="_blank"
                rel="noreferrer"
              ></a>
            </p>
            <a
              className="text-dark fs-4"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
