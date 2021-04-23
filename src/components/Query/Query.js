import React from 'react';
import axios from 'axios';
import './Query.css'
import {  Row, Col, Form, Button } from 'react-bootstrap'

export default class Query extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      result: null
    };
  }

  handleChange = event => {
    this.setState({ query: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const query = this.state.query;

    if (query !== "") {
      axios.post('http://127.0.0.1:5000/', { query })
        .then(res => {
          this.setState({ result : JSON.stringify(res.data) });
          document.getElementById("result").style.display = "block";
          console.log(res);
          console.log(res.data);
        })
    } else {
      alert("Query cannot be empty.")
    }

  }
  render() {
    return (
      <Row className="justify-content-md-center">
        <Col>
          <Form  onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Query:</Form.Label>
                <Form.Control type="text" name="query" onChange={this.handleChange} />
              </Form.Group>
              <Button variant="primary" type="submit">Search</Button>
          </Form>
          <span id="result">Result is: { this.state.result }</span>
        </Col>
      </Row>
    )
  }
}
