import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';
import store from '../../store';

class ColoredRect extends React.Component {
  render() {
    const myScale = store.getState().shapes.scale;
    const { x, y, width, height, color } = this.props;
    return (
      <Rect
        x={x * myScale}
        y={y * myScale}
        width={width * myScale}
        height={height * myScale}
        stroke={color}
        strokeWidth={4}
        draggable
      />
    );
  }
}

ColoredRect.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default ColoredRect;
