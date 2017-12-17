import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ShelfCard = props => (
  <li className="search-results">
    <div className="item row-item">
      <div className="image">
        <div className="image-view">
          <Link to={`/items/${props.id}`}>
            <img height="160" width="160" alt={`${props.title}`} src={props.picture} />
          </Link>
        </div>
      </div>
      <div className="info-container">
        <div className="price-container">
          <span className="currency">{props.price.currency}</span>
          <span >{props.price.price}</span>
        </div>
        <Link to={`/items/${props.id}`}>
          <h2>{props.title}</h2>
        </Link>
      </div>
    </div>
  </li>
);

ShelfCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.object // eslint-disable-line
};

export default ShelfCard;
