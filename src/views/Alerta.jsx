import Alert from 'react-bootstrap/Alert';

const Alerta = ({ error, success }) => {
    return (
        <div className='alerta'>
            {error && (
                <Alert variant="danger">
                    <p style={{ color: "red" }}>{error}</p>
                </Alert>
            )}
            {success && (
                <Alert variant="success">
                    <p style={{ color: "green" }}>{success}</p>
                </Alert>
            )}
        </div>
    );
};

export default Alerta;