import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";


class Header extends Component {
  state = {
    searchTerm: "",
    redirect: false
  };
  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };
  handleSearchSubmit = searchTerm => {
    if (searchTerm) {
      this.setState({ redirect: true });
    }
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: "/items", search: `?search=${this.state.searchTerm}` }} />;
    }
    return (
      <header>
        <div>
          <h1>
            <Link to="/">Busca</Link>
          </h1>
          <input onChange={this.handleSearchTermChange} type="search" placeholder="Nunca dejes de buscar" />
          <button
            onClick={() => {
              this.handleSearchSubmit(this.state.searchTerm);
            }}
          >
            Go
          </button>
        </div>
      </header>
    );
  }
}

export default Header
