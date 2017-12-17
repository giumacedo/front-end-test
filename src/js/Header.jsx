import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

class Header extends Component {
  state = {
    searchTerm: ''
  };
  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };
  handleSearchSubmit = (e, searchTerm) => {
    e.preventDefault();
    if (searchTerm) {
      window.location = `/items/?search=${this.state.searchTerm}`;
    }
  };
  render() {
    return <header>
        <div role="banner" className="nav-header nav-fix">
          <div className="nav-itens">
            <Link className="nav-logo" to="/" />
            <form className="nav-search" onSubmit={(e) => {
                this.handleSearchSubmit(e, this.state.searchTerm);
              }}>
              <input className="nav-search-input" onChange={this.handleSearchTermChange} type="search" placeholder={this.props.searchTerm} />
              <button className="nav-search-btn">
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
        </div>
      </header>;
  }
}

Header.propTypes = {
  searchTerm: PropTypes.string
  // handleSearchResult: PropTypes.func,
  // searchPage: PropTypes.bool
};

Header.defaultProps = {
  // searchPage: false
  // handleSearchResult: function noop() {},
  searchTerm: "Nunca dejas de comprar"
};

export default Header
