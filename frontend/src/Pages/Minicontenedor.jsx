import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../EstilosCss/Minicontenedor.css';

const Minicontenedor = ({ imagenUrl, linkTo, texto }) => (
  <Link to={linkTo} className="mini-contenedor">
    <img src={imagenUrl} alt="Mini Contenedor" />
    <p>{texto}</p>
  </Link>
);

Minicontenedor.propTypes = {
  imagenUrl: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
};

export default Minicontenedor;
