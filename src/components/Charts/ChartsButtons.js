import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { AiOutlineLineChart, AiOutlineBarChart, AiOutlinePieChart, AiFillFile, AiFillFileExcel } from 'react-icons/ai'
import { FcAreaChart } from 'react-icons/fc'
import LineChart from '../Charts/LineChart'
import ColumnChart from '../Charts/ColumnChart'
import PieChart from '../Charts/PieChart'
import Vis3d from '../Charts/Vis3d'


export default class ChartsButtons extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showHideLineChart: false,
      showHideColumnChart: false,
      showHidePieChart: false,
      showHide3dChart: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
    this.disablePieChart = this.disablePieChart.bind(this);
    this.dataToJSON = this.dataToJSON.bind(this);
    this.dataToCSV = this.dataToCSV.bind(this);
  }

  hideComponent(name) {
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
        case "showHide3dChart":
          this.setState({ showHide3dChart : !this.state.showHide3dChart });
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

  dataToJSON(inData) {
      const blob = new Blob([inData], { type: 'text\plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "Result.json";
      link.href = url;
      link.click();
  }

  dataToCSV(inData) {
    var dictOfDicts = JSON.parse(inData); //necessary to go thru dicts, because inData is string
    var stringToCSV = '';
    for (let key in dictOfDicts[0]) {
      stringToCSV += key;
      stringToCSV += ',';
    }
    stringToCSV = stringToCSV.slice(0, -1); //remove last char in line (,)
    stringToCSV += '\n';
    for (let k in dictOfDicts) {
      let dict = dictOfDicts[k];
      for (let key in dict) {
        stringToCSV += dict[key] + ','
      }
      stringToCSV = stringToCSV.slice(0, -1); //remove last char in line (,)
      stringToCSV += '\n';
    }
    const blob = new Blob([stringToCSV], { type: 'text\plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "Result.csv";
    link.href = url;
    link.click();
    console.log('check');
  }

  render() {
    const { showHideLineChart } = this.state;
    const { showHideColumnChart } = this.state;
    const { showHidePieChart } = this.state;
    const { showHide3dChart } = this.state;
    this.disablePieChart(this.props.dataFromParent);
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Button variant= "info" id="dataToJSON" className="m-3 shadow" size="lg">JSON<AiFillFile size={50} onClick= {() => this.dataToJSON(this.props.dataFromParent)}/></Button>
            <Button variant= "info" id="dataToCSV" className="m-3 shadow" size="lg">CSV<AiFillFileExcel size={50} onClick= {() => this.dataToCSV(this.props.dataFromParent)}/></Button>
            <Button variant= "info" id="lineButton" className="m-3 shadow" size="lg"><AiOutlineLineChart size={50} onClick={() => this.hideComponent("showHideLineChart")} /></Button>
            <Button variant= "info" className="m-3 shadow" size="lg"><AiOutlineBarChart size={50} onClick={() => this.hideComponent("showHideColumnChart")} /></Button>
            <Button variant= "info" id="pieButton" className="m-3 shadow" size="lg"><AiOutlinePieChart size={50} onClick={() => this.hideComponent("showHidePieChart")} /></Button>
            <Button variant= "info" id="3dButton" className="m-3 shadow" size="lg">3D<FcAreaChart size={50} onClick={() => this.hideComponent("showHide3dChart")} /></Button>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-md-center">
              {showHideLineChart && <LineChart dataToDisplay = {this.props.dataFromParent} />}
              {showHideColumnChart && <ColumnChart dataToDisplay = {this.props.dataFromParent} />}
              {showHidePieChart && <PieChart dataToDisplay = {this.props.dataFromParent} />}
              {showHide3dChart && <Vis3d dataToDisplay = {this.props.dataFromParent} />}
          </Col>
        </Row>
      </Container>
    )
  }
}
