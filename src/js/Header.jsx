import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>
      <Link to="/">
        Busca
      </Link>
    </h1>
    <input type='text' placeholder='Search' />
  </header>
);

export default Header
