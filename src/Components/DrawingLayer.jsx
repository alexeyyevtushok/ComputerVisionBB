import React from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-konva';
import ColoredRect from './ColoredRect';

class DrawingField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shape: props.shape,
      isDrawing: true,
    };
  }

  handleClick = () => {
    const { isDrawing, shape } = this.state;
    const { shapeCompleted } = this.props;
    if (isDrawing) {
      this.setState(
        {
          isDrawing: !isDrawing,
        },
        () => {
          shapeCompleted(shape);
        },
      );
    }
  };

  handleMouseMove = (e) => {
    const { isDrawing, shape } = this.state;

    const mouseX = e.evt.layerX;
    const mouseY = e.evt.layerY;

    if (isDrawing) {
      const newWidth = mouseX - shape.x;
      const newHeight = mouseY - shape.y;

      const newShape = {
        x: shape.x,
        y: shape.y,
        width: newWidth,
        height: newHeight,
        color: shape.color,
      };

      this.setState({
        shape: newShape,
      });
    }
  };

  render() {
    const { shape } = this.state;
    return (
      <Layer>
        <ColoredRect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          color={shape.color}
        />
      </Layer>
    );
  }
}

DrawingField.propTypes = {
  shapeCompleted: PropTypes.func.isRequired,
  shape: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrawingField;
