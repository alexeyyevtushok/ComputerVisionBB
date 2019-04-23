import React from 'react';
import PropTypes from 'prop-types';
import './Image.css';
import { connect } from 'react-redux';

const Image = props => {
  const { currentImg } = props;
  return (
    <div>
      <img className="currentImg" src={currentImg} alt="Logo" />
    </div>
  );
};

Image.propTypes = {
  currentImg: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentImg: state.images.currentImg,
});

export default connect(mapStateToProps)(Image);
