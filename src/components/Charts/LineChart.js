import React from 'react';
import CanvasJSReact from 'C:/Users/monik/PycharmProjects/dataworkshop_flaskAPI/frontend/src/canvasjs.react';
import moment from 'moment';


export default class LineChart extends React.Component {
  constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}


  generateDataPoints(data) {
      var dps = [];
      const dictList = JSON.parse(data);
      const dict = dictList[0];
      const titleKey = Object.keys(dict)[0];
      let title ="";
      if(typeof(dict[titleKey]) === 'string'){
        title = dict[titleKey];
        delete dict[titleKey];
      }
      var xVal;
      var flag = 0;
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
    const data = this.generateDataPoints(this.props.dataToDisplay);
    const options = {
			theme: "light2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
      title:{
        text: data[0]
      },
			data: [{
				type: "line",
        xValueFormatString: "DD-MM-YY",
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
