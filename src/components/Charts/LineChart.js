import React from 'react';
import CanvasJSReact from 'C:/Users/monik/PycharmProjects/dataworkshop_flaskAPI/frontend/src/canvasjs.react';
import moment from 'moment';


export default class LineChart extends React.Component {
  constructor() {
		super();
    this.generateData = this.generateData.bind(this);
		this.generateDataPoints = this.generateDataPoints.bind(this);
    this.generateAxisX = this.generateAxisX.bind(this);
	}

  generateData(inData) {
    var data = [];
    var title = "";
    const dictList = JSON.parse(inData);
    for (const [key, value] of Object.entries(dictList)) {
      const dataPoints = this.generateDataPoints(value);
      if(dictList.length === 1) {
        title = dataPoints[0];
        data.push({ type: "line", dataPoints: dataPoints[1] });
      } else {
        data.push({ type: 'line', name: dataPoints[0], showInLegend: true, dataPoints: dataPoints[1] });
      }
    }
    return [title, data];
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
            console.log(typeof key);
            xVal = new Date(key);
            //xVal = xVal.toLocaleDateString();
          } else {
            xVal = key;
          }
          dps.push({x: xVal, y: value});
      }
      return [title, dps];
  }

  generateAxisX(dps) {
    let axisX;
    //dps[0]["dataPoints"] to get length of one dict
    if (dps[0]["dataPoints"].length < 21) {
      axisX = {interval: 1};
    } else if (dps[0]["dataPoints"].length < 101) {
      axisX = {interval: 5};
    } else {
      axisX = {interval: 25};
    }

    if (moment(dps[0]['x']).isValid()) {
      axisX['valueFormatString'] ="DD/MM/YY";
      axisX['intervalType'] = "day";
    }
    return axisX;
  }

  render() {
    const data = this.generateData(this.props.dataToDisplay);
    const axisX = this.generateAxisX(data[1]);
    const options = {
      title: {
        text: data[0]
      },
			animationEnabled: true,
			zoomEnabled: true,
      exportEnabled: true,
      axisX: axisX,
			data: data[1]
		};
    return (
      <div className="m-3">
        <CanvasJSReact.CanvasJSChart options = {options} />
      </div>
    )
  }
}
