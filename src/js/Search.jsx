import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from './Header';

class Search extends Component {
  state = {
    results: []
    // searchTerm: '',
  };
  componentDidMount() {
    const regex = /=(.+)/;
    const paramsSearch = this.props.location.search.match(regex);
    const searchTerm = paramsSearch[1];

    const url = `http://localhost:3000/api/items?q="${searchTerm}`;
    axios
      .get(url)
      .then(response => {
        const data = { results: response.data.items };
        this.setState(data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return <div className="search">
        Busca
        <Header />
        <div className="wrapper">
          {this.state.results.map(product => <div key={product.id}>
              <Link to={`/items/${product.id}`}>
                <img alt={`${product.title}`} src={product.picture} />
              </Link>
              <div>
                <div>
                  <span className="curency">{product.price.currency}</span>
                  <span className="curency">{product.price.price}</span>
                </div>
                <Link to={`/items/${product.id}`}>
                  <h2>{product.title}</h2>
                </Link>
              </div>
            </div>)}
        </div>
      </div>;
  }
}

Search.propTypes = {
  location: PropTypes.object // eslint-disable-line
};



export default Search;
