import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import ColoredRect from './ColoredRect';

const style = {
  position: 'absolute',
};

class DrawingField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [],
      isDrawing: false,
      isDrawingMode: true,
    };
  }

  handleClick = (e) => {
    const { isDrawingMode, isDrawing, shapes } = this.state;
    const { currentColor } = this.props;
    if (!isDrawingMode) {
      return;
    }
    if (isDrawing) {
      this.setState({
        isDrawing: !isDrawing,
      });
      return;
    }

    // otherwise, add a new rectangle at the mouse position with 0 width and height,
    // and set isDrawing to true
    const newShapes = shapes.slice();
    newShapes.push({
      x: e.evt.layerX,
      y: e.evt.layerY,
      width: 0,
      height: 0,
      color: currentColor,
    });

    this.setState({
      isDrawing: true,
      shapes: newShapes,
    });
  };

  handleMouseMove = (e) => {
    const { isDrawingMode, isDrawing, shapes } = this.state;
    const { currentColor } = this.props;
    if (!isDrawingMode) return;

    const mouseX = e.evt.layerX;
    const mouseY = e.evt.layerY;

    // update the current rectangle's width and height based on the mouse position
    if (isDrawing) {
      // get the current shape (the last shape in this.state.shapes)
      const currShapeIndex = shapes.length - 1;
      const currShape = shapes[currShapeIndex];
      const newWidth = mouseX - currShape.x;
      const newHeight = mouseY - currShape.y;

      const newShapesList = shapes.slice();
      newShapesList[currShapeIndex] = {
        x: currShape.x, // keep starting position the same
        y: currShape.y,
        width: newWidth, // new width and height
        height: newHeight,
        color: currentColor,
      };

      this.setState({
        shapes: newShapesList,
      });
    }
  };

  handleCheckboxChange = () => {
    // toggle drawing mode
    this.setState({
      isDrawingMode: !this.state.isDrawingMode,
    });
  };

  render() {
    const { isDrawingMode, shapes } = this.state;
    const { currentColor } = this.props;
    return (
      <div style={style}>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onContentClick={this.handleClick}
          onContentMouseMove={this.handleMouseMove}
        >
          <Layer ref="layer">
            {/*
                render the shapes array - each element in 'shapes' renders a ColoredRect component
                with that element's dimensions. Any time these dimensions change (in the handle
                functions), the ColoredRect rerenders to reflect those changes.
              */}
            {shapes.map(shape => (
              <ColoredRect
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                color={shape.color}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

DrawingField.propTypes = {
  currentColor: PropTypes.string.isRequired,
};

export default DrawingField;
