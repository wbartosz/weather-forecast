import React, { Component } from 'react';
import Search from './Search';
import Statistics from './Statistics';
import axios from 'axios';
import './App.css';

const API = {
  BASE: 'https://api.openweathermap.org/data/2.5/forecast',
  // IMPORTANT: Usually we would use a reverse proxy to hide the key.
  // For the purpose of this task I will keep it here
  KEY: 'c324e571a5fdc9a88c475e20fd0d7ff4'
};

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
       city: 'London',
       country: 'GB',
       validationMessage: null,
       forecast: {}
    }

    this.updateCity = this.updateCity.bind(this);
  }

  componentDidMount() {
    this.getForecast(this.state.city);
  }

  async getForecast(city) {
    const apiURL = `${API.BASE}?q=${city}&appid=${API.KEY}&units=metric&cnt=5`;

    try {
      const forecast = await axios.get(apiURL);

      this.setState({
        city: city,
        country: forecast.data.city.country,
        forecast: forecast.data,
        validationMessage: null
      });
    } catch(err) {
      this.setState({ validationMessage: err.response.data.message });
    }
  }

  updateCity(city) {
    this.getForecast(city);
  }

  render() {
    const { city, country, validationMessage, forecast } = this.state;

    return (
      <div className="App">
        <Search
          query={city}
          updateCity={this.updateCity}
          validationMessage={validationMessage}
        />
        {forecast.list &&
          <Statistics
            forecasts={forecast.list}
            city={city}
            country={country}
          />}
      </div>
    )
  }
}

export default App;
