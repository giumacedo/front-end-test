import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ShelfCard = (props) => (
  <div>
    <Link to={`/items/${props.id}`}>
      <img alt={`${props.title}`} src={props.picture} />
    </Link>
    <div>
      <div>
        <span className="curency">{props.price.currency}</span>
        <span className="curency">{props.price.price}</span>
      </div>
      <Link to={`/items/${props.id}`}>
        <h2>{props.title}</h2>
      </Link>
    </div>
  </div>
);

ShelfCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.object // eslint-disable-line
};

export default ShelfCard;
