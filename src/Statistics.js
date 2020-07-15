import React, { Component } from 'react';
import DataTracker from './DataTracker';
import './Statistics.css';

export class Statistics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groupedForecasts: {}
    };
  }

  componentDidMount() {
    this.groupForecasts();
  }

  componentDidUpdate(prevProps) {
    if(this.props.city !== prevProps.city) {
      this.groupForecasts();
    }
  }

  getTemperatures(forecastObject) {
    let temperatures = [];

    for(let prop in forecastObject) {
      if(['temp', 'temp_min', 'temp_max'].includes(prop)) {
        temperatures.push(forecastObject[prop]);
      }
    }
    return temperatures;
  }

  groupForecasts() {
    let forecastData = {
      dayTemperatures: [],
      nightTemperatures: [],
      morningTemperatures: [],
      humidities: []
    }

    this.props.forecasts.forEach(f => {
      const forecastDate = new Date(f['dt_txt']);
      const forecastTime = forecastDate.getHours();

      /*
       * Morning: 5 - 12
       * Day: 13 - 21
       * Night: 22 - 4
       */
      // Morning or day
      if(forecastTime > 4 && forecastTime < 22) {
        if(forecastTime < 13) {
          forecastData.morningTemperatures = this.getTemperatures(f.main); // Morning
        } else {
          forecastData.dayTemperatures = this.getTemperatures(f.main); // Day
        }
      } else {
        forecastData.nightTemperatures = this.getTemperatures(f.main); // Night
      }

      forecastData.humidities.push(f.main.humidity);
    });

    this.setState({ groupedForecasts: forecastData });
  }

  render() {
    const { dayTemperatures, morningTemperatures, nightTemperatures, humidities } = this.state.groupedForecasts;

    return (
      <div className="Statistics">
        <h1 className="Statistics-title">Statistics</h1>
        <h3 className="Statistics-city">{this.props.city}, {this.props.country}</h3>

        <div className="Statistics-grid">
          <DataTracker
            name="Morning temperature"
            forecastValues={morningTemperatures}
            symbol="°C"
          />
          <DataTracker
            name="Day temperature"
            forecastValues={dayTemperatures}
            symbol="°C"
          />
          <DataTracker
            name="Night temperature"
            forecastValues={nightTemperatures}
            symbol="°C"
          />
          <DataTracker
            name="Humidity"
            forecastValues={humidities}
            symbol="%"
          />
        </div>
      </div>
    )
  }
}

export default Statistics;
