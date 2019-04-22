import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import Konva from 'konva';
import ColoredRect from '../ColoredRect/ColoredRect';
import './DrawingField.css';

class DrawingField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [],
      isDrawing: false,
      width: this.calculateWidth(),
      height: this.calculateHeight(),
    };
  }

  // componentDidMount = () => {
  //   window.addEventListener('resize', this.updateDimensions);
  // };

  // componentWillUnmount = () => {
  //   window.removeEventListener('resize', this.updateDimensions);
  // };

  // updateDimensions = () => {
  //   console.log('updating dimensions');
  //   this.setState({
  //     width: this.calculateWidth(),
  //     height: this.calculateHeight(),
  //   });
  // };

  calculateHeight = () => document.documentElement.clientHeight * 0.7;

  calculateWidth = () => document.documentElement.clientWidth * 0.555;

  transformColor = (color) => {
    const rgb = Konva.Util.getRGB(color);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)`;
  };

  handleClick = (e) => {
    const { isDrawing, shapes } = this.state;
    const { currentColor, drawingMode } = this.props;

    if (!drawingMode) return;

    if (isDrawing) {
      this.setState({
        isDrawing: !isDrawing,
      });
      return;
    }

    const newShapes = shapes.slice();
    newShapes.push({
      x: e.evt.layerX,
      y: e.evt.layerY,
      width: 0,
      height: 0,
      color: this.transformColor(currentColor),
    });

    this.setState({
      isDrawing: true,
      shapes: newShapes,
    });
  };

  handleMouseMove = (e) => {
    const { isDrawing, shapes } = this.state;
    const { drawingMode } = this.props;

    if (!drawingMode) return;

    const mouseX = e.evt.layerX;
    const mouseY = e.evt.layerY;

    if (isDrawing) {
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
        color: currShape.color,
      };

      this.setState({
        shapes: newShapesList,
      });
    }
  };

  render() {
    const { shapes, width, height } = this.state;
    return (
      <div>
        <Stage
          className="drawingField"
          width={width}
          height={height}
          onClick={this.handleClick}
          onContentMouseMove={this.handleMouseMove}
        >
          <Layer>
            {shapes.map(shape => (
              <ColoredRect
                key={shape.color}
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
  drawingMode: PropTypes.bool.isRequired,
  currentColor: PropTypes.string.isRequired,
};

export default DrawingField;
