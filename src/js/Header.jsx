import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

class Header extends Component {
  state = {
    searchTerm: "",
    redirect: false,
    results: []
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
        this.setState({ redirect: true });
      })
      .catch(error => console.log(error));
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: 'items', search:`?search=${this.state.searchTerm}`, state: { result: this.state.results } }} />;
    }
    return <header>
        <div>
          <h1>
            <Link to="/">Busca</Link>
          </h1>
          <input onChange={this.handleSearchTermChange} type="search" placeholder="Nunca dejes de buscar" />
          <button onClick={() => {
              this.handleClick(this.state.searchTerm);
            }}>
            Go
          </button>
        </div>
      </header>;
  }
}

export default Header
