import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

class ColoredRect extends React.Component {
  render() {
    const { x, y, width, height, color, onClick } = this.props;
    return (
      <Rect
        sacleY={5}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={color}
        strokeWidth={4}
        onClick={e => onClick(e)}
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
