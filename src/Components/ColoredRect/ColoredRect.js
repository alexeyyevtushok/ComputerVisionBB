import React from "react";
import { Rect, Group } from "react-konva";
import PropTypes from "prop-types";

class ColoredRect extends React.Component {

  render() {
    const { x, y, width, height, color,onClick } = this.props;
    return (
      <Group>
        <Rect x={x} y={y} width={width} height={height} fill={color} onClick={onClick} name={`Figure${x}`}/>
      </Group>
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
