import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { AiOutlineLineChart, AiOutlineBarChart, AiOutlinePieChart } from 'react-icons/ai'
import LineChart from '../Charts/LineChart'
import ColumnChart from '../Charts/ColumnChart'
import PieChart from '../Charts/PieChart'


export default class ChartsButtons extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showHideLineChart: false,
      showHideColumnChart: false,
      showHidePieChart: false,
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
          break;
        case "showHidePieChart":
          this.setState({ showHidePieChart: !this.state.showHidePieChart });
          break;
      }
  }

  render() {
    const { showHideLineChart } = this.state;
    const { showHideColumnChart } = this.state;
    const { showHidePieChart } = this.state;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineLineChart size={50} onClick={() => this.hideComponent("showHideLineChart")} /></Button>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineBarChart size={50} onClick={() => this.hideComponent("showHideColumnChart")} /></Button>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlinePieChart size={50} onClick={() => this.hideComponent("showHidePieChart")} /></Button>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-md-center">
              {showHideLineChart && <LineChart dataToDisplay = {this.props.dataFromParent} />}
              {showHideColumnChart && <ColumnChart dataToDisplay = {this.props.dataFromParent} />}
              {showHidePieChart && <PieChart dataToDisplay = {this.props.dataFromParent} />}
          </Col>
        </Row>
      </Container>
    )
  }
}
