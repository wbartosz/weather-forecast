import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from './search.svg';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
       query: this.props.query
    }
  };

  handleChange = (evt) => {
    this.setState({ query: evt.target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.state.query && this.props.updateCity(this.state.query);
  }

  render() {
    const { validationMessage } = this.props;
    const searchInputWrapperClass = `Search-input-wrapper ${validationMessage ? 'invalid' : ''}`;

    return (
      <form className="Search" onSubmit={this.handleSubmit}>
        <label htmlFor="search">Search City</label>
        <div className={searchInputWrapperClass}>
          <SearchIcon className="Search-icon" />
          <input
            type="text"
            value={this.state.query}
            id="search"
            onChange={this.handleChange}
            placeholder="London"
          />
          <button type="submit" className="Search-button">Search</button>
        </div>
        {validationMessage &&
          <div className="Search-validation-msg">
            {validationMessage.charAt(0).toUpperCase() + validationMessage.slice(1)}
          </div>}
      </form>
    )
  }
}

export default Search;
