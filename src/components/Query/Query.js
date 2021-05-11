import React from 'react';
import axios from 'axios';
import './Query.css';
import ChartsButtons from '../Charts/ChartsButtons';
import {  Row, Col, Form, Button } from 'react-bootstrap';

export default class Query extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      result: null,
      rows: 3,
      minRows: 3,
			maxRows: 25,
    };
  }

  handleChange = event => {
    const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;

		const previousRows = event.target.rows;
  	event.target.rows = minRows; // reset number of rows in textarea

		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }

		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}

    this.setState({ rows: currentRows < maxRows ? currentRows : maxRows, query: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const query = this.state.query;

    if (query !== "") {
      axios.post('http://127.0.0.1:5000/', { query })
        .then(res => {
          this.setState({ result : JSON.stringify(res.data) });
          document.getElementById("result").style.display = "block";
          console.log(res.data);
        })
    } else {
      alert("Query cannot be empty.")
    }
  }

  hideShowResult() {
    var x = document.getElementById("result-box");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  render() {
    return (
      <Row className="justify-content-md-center">
        <Col>
          <Form className="m-2"  onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Query:</Form.Label>
                <Form.Control as="textarea" rows={this.state.rows} name="query" onChange={this.handleChange}/>
              </Form.Group>
              <Button variant="primary" type="submit">Search</Button>
          </Form>
          <div id="result" className="mt-5 mb-4">
            <div id="result-box" className="p-3 mb-2 shadow">Result is: {this.state.result}</div>
            <Button variant="primary" className="float-right" onClick={this.hideShowResult}>Hide/Show Result</Button>
            <br />
            <ChartsButtons dataFromParent = {this.state.result} />
          </div>
        </Col>
      </Row>
    )
  }
}
