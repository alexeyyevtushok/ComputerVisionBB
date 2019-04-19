import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { currentImg, currEntity } = this.props;
    let drawingMode = false;
    if (currEntity.color !== '') {
      drawingMode = true;
    }

    return (
      <div className="midleMain">
        <EntitiesField />
        <div className="targetImg">
          <p>Image</p>
          <DrawingField drawingMode={drawingMode} currentColor={currEntity.color} />
          <Image currentImg={currentImg} />
        </div>
      </div>
    );
  }
}

Middle.propTypes = {
  currentImg: PropTypes.string.isRequired,
  currEntity: PropTypes.shape({
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  currEntity: state.entities.currEntity,
});

export default connect(mapStateToProps)(Middle);
