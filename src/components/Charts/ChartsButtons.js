import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import { AiOutlineLineChart, AiOutlineBarChart, AiOutlineDotChart, AiOutlinePieChart, AiOutlineAreaChart } from 'react-icons/ai'


export default class ChartsButtons extends React.Component {
  render() {
    return (
      <Row className="justify-content-md-center">
        <Col>
          <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineLineChart size={50} /></Button>
          <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineBarChart size={50} /></Button>
          <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineDotChart size={50} /></Button>
          <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlinePieChart size={50} /></Button>
          <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineAreaChart size={50} /></Button>
        </Col>
      </Row>
    )
  }
}
