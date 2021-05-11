import React from 'react';
import CanvasJSReact from 'C:/Users/monik/PycharmProjects/dataworkshop_flaskAPI/frontend/src/canvasjs.react';


export default class PieChart extends React.Component {
  constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}

  generateDataPoints(data) {
    let dps = [];
    let labels = [];
    let values = [];
    let sum =0;
    const dictList = JSON.parse(data);
    let title = "";
    if (dictList.length === 1) {
      const dict = dictList[0];
      const titleKey = Object.keys(dict)[0];
      if(typeof(dict[titleKey]) === 'string'){
        title = dict[titleKey];
        delete dict[titleKey];
      }
      for (const [key, value] of Object.entries(dict)){
          labels.push(key);
          values.push(value);
          sum += value;
      }
      for (var i=0; i < labels.length; i++) {
          const prcValue = (values[i]/sum)*100;
          dps.push({label: labels[i], y: prcValue.toFixed(2)});
      }
    } else {
      let dict = {};
      for (const [key, value] of Object.entries(dictList)) {
        dict = value;
        const labelKey = Object.keys(dict)[0];
        const valueKey = Object.keys(dict)[1];
        labels.push(dict[labelKey]);
        values.push(dict[valueKey]);
        sum += dict[valueKey];
      }
      for (var i=0; i < labels.length; i++ ){
        const prcValue = (values[i]/sum)*100;
        dps.push({label: labels[i], y: prcValue.toFixed(2)});
      }
    }
    return [title, dps];
  }

  render() {
    const data = this.generateDataPoints(this.props.dataToDisplay);
    const options = {
      theme: "light1",
      zoomEnabled: true,
      exportEnabled: true,
      title: {
        text: data[0]
      },
      data: [{
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{y}%",
        indexLabelPlacement: "inside",
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
