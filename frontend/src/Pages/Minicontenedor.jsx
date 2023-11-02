import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Minicontenedor = ({ imagenUrl, linkTo }) => (
  <Link to={linkTo}>
    <div className="mini-contenedor">
      <img src={imagenUrl} alt="Mini Contenedor" />
    </div>
  </Link>
);

Minicontenedor.propTypes = {
  imagenUrl: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export default Minicontenedor;
