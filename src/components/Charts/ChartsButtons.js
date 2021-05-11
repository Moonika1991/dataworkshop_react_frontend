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
    this.disablePieChart = this.disablePieChart.bind(this);
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

  disablePieChart(inData) {
    if (inData !== null) {
      const dictList = JSON.parse(inData);
      const pieButton = document.getElementById('pieButton');
      if (dictList.length === 1) {
        pieButton.disabled = false;
      } else if (Object.entries(dictList[0]).length <= 2) {
        pieButton.disabled = false;
      } else {
        pieButton.disabled = true;
      }
    }
  }

  render() {
    const { showHideLineChart } = this.state;
    const { showHideColumnChart } = this.state;
    const { showHidePieChart } = this.state;
    this.disablePieChart(this.props.dataFromParent);
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineLineChart size={50} onClick={() => this.hideComponent("showHideLineChart")} /></Button>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineBarChart size={50} onClick={() => this.hideComponent("showHideColumnChart")} /></Button>
            <Button variant= "info" id="pieButton" className="m-3 shadow" size="lg"><AiOutlinePieChart size={50} onClick={() => this.hideComponent("showHidePieChart")} /></Button>
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
