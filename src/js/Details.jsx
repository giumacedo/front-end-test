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
              <figure className="item-gallery">
                <img width="500" height="500" alt={picture} src={picture} />
              </figure>
              <section>
                <h2 className="main-section-title">Description del producto</h2>
                <div className="item-description">{description}</div>
              </section>
            </div>
            <div className="layout-col-right">
              <section>
                <div className="item-conditions">
                  {condition} - {soldQuantity} vendidos
                </div>
                <header className="item-title">
                  <h1 className="item-title-primary">{title}</h1>
                </header>
                <fieldset className="item-price">
                  <span>
                    <span className="currency">{priceCurrency}</span>
                    <span>{totalPrice}</span>
                  </span>
                </fieldset>
                <div className="item-actions">
                  <input value="Comprar" type="submit" className="ui-button-primary"/>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>;
  }
}

Details.propTypes = {
  match: PropTypes.object // eslint-disable-line
};


export default Details;
