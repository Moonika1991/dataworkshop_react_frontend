import React from 'react';
import Plot from 'react-plotly.js';

export default class Vis3d extends React.Component {
  constructor() {
    super();
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  generateDataPoints(data){
    d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err, rows){
      function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
      }

      var z_data = []
      for (i=0;i<24;i++){
        z_data.push(unpack(rows,i));
      }
    })
    return z_data;
  }

  render() {
  const data = this.generateDataPoints(this.props.dataToDisplay);
  const options = {
    title: 'Mt Bruno Elevation',
    data: [{
      type: 'surface',
      z: data
    }]
  };

  return (
    <div className="m-3">
      <Plot data = {options} />
    </div>
    )
  }
}
