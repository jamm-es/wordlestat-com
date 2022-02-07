import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Error(props) {
  const navigate = useNavigate();

  return <main className='wrapper mx-auto mt-3'>
    <h1 className='text-center'>{props.type}</h1>
    <p>{props.description}</p>
    <Row>
      <Col>
        <h4><a onClick={() => navigate(-1)} className='text-info' >Return to previous page</a></h4>
      </Col>
      <Col>
        <h4><a href='/' className='text-info' >Return to today's stats</a></h4>
      </Col>
    </Row>
  </main>
}

export default Error;