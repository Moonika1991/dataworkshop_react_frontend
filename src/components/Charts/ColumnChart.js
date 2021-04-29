import React from 'react';
import CanvasJSReact from 'C:/Users/monik/PycharmProjects/dataworkshop_flaskAPI/frontend/src/canvasjs.react';

export default class ColumnChart extends React.Component {
  constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}

  generateDataPoints(data) {
    let dps = [];
    const dictList = JSON.parse(data);
    let title = "";
    if (dictList.length === 1) {
      const dict = dictList[0];
      const titleKey = Object.keys(dict)[0];
      if(typeof(dict[titleKey]) === 'string'){
        title = dict[titleKey];
        delete dict[titleKey];
      }
      var flag = 0;
      for (const [key, value] of Object.entries(dict)){
          dps.push({label: key, y: value});
      }
    }
    return [title, dps];
  }

  render() {
    const data = this.generateDataPoints(this.props.dataToDisplay);
    console.log(data[1]);
    const options = {
      theme: "light1",
      zoomEnabled: true,
      title: {
        text: data[0]
      },
      axisY: {
        includeZero: true
      },
      data: [{
        type: "column",
				dataPoints: data[1]
			}]

    };

    return (
      <div className="m-3">
        <CanvasJSReact.CanvasJSChart options = {options} />
      </div>
    )
  }
}
