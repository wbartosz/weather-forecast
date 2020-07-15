import React, { Component } from 'react';
import './DataTracker.css';

export class DataTracker extends Component {
  static defaultProps = {
    forecastValues: []
  }

  getMin = () => Math.min(...this.props.forecastValues);

  getMax = () => Math.max(...this.props.forecastValues);

  getMean() {
    const sum = this.props.forecastValues.reduce((prev, curr) => (
      prev + curr
    ), 0);
    return (sum / this.props.forecastValues.length).toFixed(2);
  }

  getMode() {
    return Object.values(
      this.props.forecastValues.reduce((count, e) => {
        if (!(e in count)) {
          count[e] = [0, e];
        }

        count[e][0]++;
        return count;
      }, {})
    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
  }

  render() {
    const { name, symbol, forecastValues } = this.props;
    const dataTrackerInfo = forecastValues.length
      ? (<>
          <div className="DataTracker-row">
            <span className="DataTracker-desc">Min:</span>
            {this.getMin()}{symbol}
          </div>
          <div className="DataTracker-row">
            <span className="DataTracker-desc">Max:</span>
            {this.getMax()}{symbol}
          </div>
          <div className="DataTracker-row">
            <span className="DataTracker-desc">Mean:</span>
            {this.getMean()}{symbol}
          </div>
          <div className="DataTracker-row">
            <span className="DataTracker-desc">Mode:</span>
            {this.getMode()}{symbol}
          </div>
        </>)
      :
        `No ${name.toLowerCase()} info`;

    return (
      <div className="DataTracker">
        <h3 className="DataTracker-title">{name}</h3>
        {dataTrackerInfo}
      </div>
    )
  }
}

export default DataTracker;
