import React from 'react';
import CanvasJSReact from 'C:/Users/monik/PycharmProjects/dataworkshop_flaskAPI/frontend/src/canvasjs.react';

export default class ColumnChart extends React.Component {
  constructor() {
		super();
    this.generateOptions = this.generateOptions.bind(this);
    this.generateSingleDataPoints = this.generateSingleDataPoints.bind(this);
	}

  generateOptions(inData) {
    var options = {exportEnabled: true, animationEnabled: true, zoomEnabled: true};
    var data = [];
    const dictList = JSON.parse(inData);
    if (dictList.length === 1) {
      const dataPoints = this.generateSingleDataPoints(dictList[0]);
      const title = {text: dataPoints[0]};
      data.push({ type: "column", dataPoints: dataPoints[1]});
      options['title'] = title;
      options['data'] = data;
    } else {
        var dps = [];
        // just to check dicts length
        const testDictKey = Object.keys(dictList)[0];
        const testDict = dictList[testDictKey];
        if (Object.keys(testDict).length === 2) {
          for (const[key, value] of Object.entries(dictList)) {
            const dict = value;
            const labelKey = Object.keys(dict)[0];
            const valueKey = Object.keys(dict)[1];
            dps.push({label: dict[labelKey], y: dict[valueKey]});
          }
          data.push({ type: "column", dataPoints: dps});
        } else {
            for (const[key, value] of Object.entries(dictList)) {
              const dict = value;
              const nameKey = Object.keys(dict)[0];
              const name = dict[nameKey];
              delete dict[nameKey];
              for (const[key,value] of Object.entries(dict)) {
                dps.push({label: key, y: value});
              }
              data.push({type: "column", name: name, showInLegend: true, dataPoints: dps});
              dps = [];
            }
        }
        options['data'] = data;
    }
    return options
  }

  generateSingleDataPoints(dict) {
    let dps = [];
    let title = "";
    const titleKey = Object.keys(dict)[0];
    if(typeof(dict[titleKey]) === 'string'){
      title = dict[titleKey];
      delete dict[titleKey];
    }
    for (const [key, value] of Object.entries(dict)){
        dps.push({label: key, y: value});
    }
    return [title, dps];
  }

  render() {
    const options = this.generateOptions(this.props.dataToDisplay);

    return (
      <div className="m-3">
        <CanvasJSReact.CanvasJSChart options = {options} />
      </div>
    )
  }
}
