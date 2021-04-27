import React from 'react';
import CanvasJSReact from 'C:/Users/monik/PycharmProjects/dataworkshop_flaskAPI/frontend/src/canvasjs.react';


export default class LineChart extends React.Component {
  constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}

  generateDataPoints(data) {
      var dps = [];
      const dictList = JSON.parse(data);
      const dict = dictList[0];
      for (const [key, value] of Object.entries(dict)){
          dps.push({x: new Date(key), y: value});
      }
      return dps;
  }

  render() {
    const options = {
			theme: "light2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			data: [{
				type: "area",
        xValueFormatString: "DD-MM-YY",
				dataPoints: this.generateDataPoints(this.props.dataToDisplay)
			}]
		}

    return (
      <div>
        <CanvasJSReact.CanvasJSChart options = {options} />
      </div>
    )
  }
}
