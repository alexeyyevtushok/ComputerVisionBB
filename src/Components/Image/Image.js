import React from 'react';
import PropTypes from 'prop-types';
import './Image.css';

const Image = ({ currentImg }) => (
  <div>
    <img className="currentImg" src={currentImg} alt="Logo" />
  </div>
);

Image.propTypes = {
  currentImg: PropTypes.string.isRequired,
};

export default Image;
