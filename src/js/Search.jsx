import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from './Header';
import ShelfCard from "./ProdutCard";

class Search extends Component {
  state = {
    results: [],
    searchTerm: ""
  };
  componentDidMount() {
    const regex = /=(.+)/;
    const paramsSearch = this.props.location.search.match(regex);
    const searchTerm = paramsSearch[1];
    this.handleSearchResult(searchTerm);
  }
  handleSearchResult = (searchTerm) => {
    const url = `http://localhost:3000/api/items?q='${searchTerm}`;
    axios
      .get(url)
      .then(response => {
        const data = { results: response.data.items };
        this.setState(data);
        this.setState({ searchTerm }); // eslint-disable-line
      })
      .catch(error => console.log(error));
  };
  render() {
    let searchBar;
    if (this.state.searchTerm.length > 0) {
      searchBar = <Header searchPage handleSearchResult={this.handleSearchResult} searchTerm={this.state.searchTerm} />;
    }
    return (
      <div className="search">
        {searchBar}
        <div className="wrapper">{this.state.results.map(product => <ShelfCard key={product.id} {...product} />)}</div>
      </div>
    );
  }
}

Search.propTypes = {
  location: PropTypes.object // eslint-disable-line
};

export default Search;
