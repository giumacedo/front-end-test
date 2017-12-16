import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
  state = {
    searchTerm: ""
  };
  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };
  handleClick = searchTerm => {
    const url = `http://localhost:3000/api/items?q="${searchTerm}`;
    axios
      .get(url)
      .then(response => {
        const data = {
          results: response.data
        };
        this.setState(data);
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <header>
        <div>
          <h1>
            <Link to="/">Busca</Link>
          </h1>
          <input onChange={this.handleSearchTermChange} type="search" placeholder="Nunca dejes de buscar" />
          <button onClick={() => { this.handleClick(this.state.searchTerm) }}>Go</button>
        </div>
      </header>
    );
  }
}

export default Header
