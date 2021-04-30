import React from 'react';
import CanvasJSReact from 'C:/Users/monik/PycharmProjects/dataworkshop_flaskAPI/frontend/src/canvasjs.react';
import moment from 'moment';


export default class LineChart extends React.Component {
  constructor() {
		super();
    this.generateData = this.generateData.bind(this);
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}

  generateData(inData) {
    var data = []
    const dictList = JSON.parse(inData);
    for (const [key, value] of Object.entries(dictList)) {
      const dataPoints = this.generateDataPoints(value);
      console.log(dataPoints);
      data.push({ type: 'line', name: dataPoints[0], showInLegend: true, dataPoints: dataPoints[1] });
    }
    return data;
  }

  generateDataPoints(dict) {
      var dps = [];
      let title = "";
      const titleKey = Object.keys(dict)[0];
      if(typeof(dict[titleKey]) === 'string'){
        title = dict[titleKey];
        delete dict[titleKey];
      }
      var xVal;
      for (const [key, value] of Object.entries(dict)){
          if (moment(key).isValid()){
              xVal = new Date(key);
          } else {
            xVal = key;
          }
          dps.push({x: xVal, y: value});
      }
      return [title, dps];
  }

  render() {
    const data = this.generateData(this.props.dataToDisplay);
    const options = {
			theme: "light2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			data: data
		};

    return (
      <div className="m-3">
        <CanvasJSReact.CanvasJSChart options = {options} />
      </div>
    )
  }
}
