import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Header from './Header';

class Details extends Component {
  state = {
    apiData: {}
  };
  componentDidMount() {
    const paramsProductId = this.props.match.params.id;
    axios
      .get(`http://localhost:3000/api/item/${paramsProductId}`)
      .then((response: { data: { rating: string } }) => {
        this.setState({ apiData: response.data.item });
      });
  }
  render() {
    const { picture, condition, title, description } = this.state.apiData;
    let priceCurrency;
    let totalPrice;
    let soldQuantity;
    if (this.state.apiData.price) {
    priceCurrency = this.state.apiData.price.currency;
    totalPrice = this.state.apiData.price.price;
    soldQuantity = this.state.apiData.sold_quantity;
    }
    return <div className="main-wrapper">
        <Header />
        <main role="main">
          <section className="ml-main">
            <div className="layout-col-left">
              <figure>
                <img alt={picture} src={picture} />
              </figure>
            </div>
            <div className="layout-col-right">
              <section>
                <div>
                  {condition} - {soldQuantity} vendidos
                </div>
                <header>
                  <h1>{title}</h1>
                </header>
                <fieldset>
                  <span>
                    <span>{priceCurrency}</span>
                    <span>{totalPrice}</span>
                  </span>
                </fieldset>
              </section>
              <section>
                <h2>Description del producto</h2>
                {description}
              </section>
            </div>
          </section>
            </main>
          </div>
          ;
  }
}

Details.propTypes = {
  match: PropTypes.object // eslint-disable-line
};


export default Details;
