import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Image.css';
import { connect } from 'react-redux';
import { imageOnClick } from '../../actions/imagesActions';

class Image extends Component {
  componentDidUpdate() {
    console.log(this.props.currentImg);
  }

  render() {
    const { currentImg } = this.props;
    return (
      <div>
        <img className="currentImg" src={currentImg} alt="Logo" />
      </div>
    );
  }
}

Image.propTypes = {
  currentImg: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentImg: state.images.currentImg,
});

export default connect(
  mapStateToProps,
  { imageOnClick },
)(Image);
