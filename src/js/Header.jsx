import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link, Redirect } from 'react-router-dom';


class Header extends Component {
  state = {
    searchTerm: '',
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
    let searchButton = <button onClick={() => {
          this.handleSearchSubmit(this.state.searchTerm);
        }}>
        Go
      </button>;
    if(this.props.searchPage) {
      searchButton = <button onClick={() => {
            this.props.handleSearchResult(this.state.searchTerm);
          }}>
          Go
        </button>;
    }
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: '/items', search: `?search=${this.state.searchTerm}` }} />;
    }
    return <header>
        <div>
          <h1>
            <Link to="/">Home</Link>
          </h1>
          <input onChange={this.handleSearchTermChange} type="search" placeholder={this.props.searchTerm} />
          {searchButton}
        </div>
      </header>;
  }
}

Header.propTypes = {
  searchTerm: PropTypes.string,
  handleSearchResult: PropTypes.func,
  searchPage: PropTypes.bool
};

Header.defaultProps = {
  searchPage: false,
  handleSearchResult: function noop() {},
  searchTerm: "Nunca dejas de comprar"
};


export default Header
