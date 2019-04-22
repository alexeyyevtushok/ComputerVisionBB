import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import './Middle.css';
import DrawingField from '../DrawingField/DrawingField';
import EntitiesField from '../EntitiesField/EntitiesField';

class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentImg } = this.props;
    return (
      <div className="midleMain">
        <EntitiesField />
        <div className="targetImg">
          <p>Image</p>
          <DrawingField />
          <Image currentImg={currentImg} />
        </div>
      </div>
    );
  }
}

Middle.propTypes = {
  currentImg: PropTypes.string.isRequired,
};

export default Middle;
