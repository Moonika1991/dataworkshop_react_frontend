import './App.css';
import Query from '../Query/Query';
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  return (
    <Container fluid="md">
      <Row className="justify-content-md-center">
        <Col md={12}>
          <h1>DataWorkshop</h1>
        </Col>
      </Row>
      <Query />
    </Container>
  );
}

export default App;
