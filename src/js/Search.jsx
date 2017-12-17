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
    let searchResults;
    if (this.state.results.length > 0) {
      searchResults = this.state.results.map(product => <ShelfCard key={product.id} {...product} />);
    } else {
      searchResults = <h3> Busca não encontrada</h3>
    }
    return <div className="main-wrapper">
        <Header searchTerm={this.state.searchTerm} />;
        <main role="main">
          <section className="ml-main">
            <ol className="wrapper">
              {searchResults}
            </ol>
          </section>
        </main>
      </div>;
  }
}

Search.propTypes = {
  location: PropTypes.object // eslint-disable-line
};

export default Search;
