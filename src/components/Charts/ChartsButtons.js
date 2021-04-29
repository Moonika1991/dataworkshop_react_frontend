import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { AiOutlineLineChart, AiOutlineBarChart, AiOutlineDotChart, AiOutlinePieChart, AiOutlineAreaChart } from 'react-icons/ai'
import LineChart from '../Charts/LineChart'
import ColumnChart from '../Charts/ColumnChart'


export default class ChartsButtons extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showHideLineChart: false,
      showHideColumnChart: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
      console.log(name);
      switch (name) {
        case "showHideLineChart":
          this.setState({ showHideLineChart : !this.state.showHideLineChart });
          break;
        case "showHideColumnChart":
          this.setState({ showHideColumnChart: !this.state.showHideColumnChart });
      }
  }

  render() {
    const { showHideLineChart } = this.state;
    const { showHideColumnChart } = this.state;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineLineChart size={50} onClick={() => this.hideComponent("showHideLineChart")} /></Button>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineBarChart size={50} onClick={() => this.hideComponent("showHideColumnChart")}/></Button>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineDotChart size={50} /></Button>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlinePieChart size={50} /></Button>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineAreaChart size={50} /></Button>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-md-center">
              {showHideLineChart && <LineChart dataToDisplay = {this.props.dataFromParent} />}
              {showHideColumnChart && <ColumnChart dataToDisplay = {this.props.dataFromParent} />}
          </Col>
        </Row>
      </Container>
    )
  }
}
