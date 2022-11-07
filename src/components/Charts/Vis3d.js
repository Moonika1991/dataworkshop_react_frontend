import React from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';

export default class Vis3d extends React.Component {
  constructor() {
    super();
    this.generateOptions = this.generateOptions.bind(this);
    this.generateVals = this.generateVals.bind(this);
  }

  generateOptions(inData) {
    var data = [];
    const dictList = JSON.parse(inData);
    const xVals = [];
    let yVals = [];
    const zVals = [];
    for (const [key, value] of Object.entries(dictList)) {
      const dataPts = this.generateVals(value);
      xVals.push(dataPts[0]);
      yVals = dataPts[1];
      zVals.push(dataPts[2]);
    }
    data.push({ type: 'surface', x: yVals, y: xVals, z: zVals, autosize: false,  width: 700, height: 700})
    return data;
  }

  generateVals(inData) {
    const xKey = Object.keys(inData)[0];
    const xVal = inData[xKey];
    delete inData[xKey];
    const yVals = [];
    const zVals = [];
    for (const [key, value] of Object.entries(inData)) {
      yVals.push(key);
      zVals.push(value);
    }
    return [xVal, yVals, zVals];
  }

  render() {
    const options = this.generateOptions(this.props.dataToDisplay);
    return (
      <div className="m-3">
        <Plot data = {options} />
      </div>
    )
  }
}
