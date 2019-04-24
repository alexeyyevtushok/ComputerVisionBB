import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Layer, Stage } from 'react-konva';
import { addShape } from '../../actions/shapesActions';
import ColoredRect from '../ColoredRect/ColoredRect';
import './DrawingField.css';

class DrawingField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shape: null,
      isDrawing: false,
      width: this.calculateWidth(),
      height: this.calculateHeight(),
    };
  }

  componentWillReceiveProps() {
    this.setState({
      shape: null,
      isDrawing: false,
    });
  }

  componentDidUpdate() {
    this.layer.batchDraw();
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateFieldSize);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateFieldSize);
  };

  calculateHeight = () => document.documentElement.clientHeight * 0.7;

  calculateWidth = () => document.documentElement.clientWidth * 0.555;

  updateFieldSize = debounce(() => {
    this.setState({
      width: this.calculateWidth(),
      height: this.calculateHeight(),
    });
  }, 500);

  handleClick = (e) => {
    const { isDrawing, shape } = this.state;
    const { currEntity } = this.props;

    if (currEntity.index === -1) return;

    if (isDrawing) {
      this.saveLabeledShape(shape);
      this.setState({
        isDrawing: !isDrawing,
        shape: null,
      });
      return;
    }

    const newShape = {
      x: e.evt.layerX,
      y: e.evt.layerY,
      width: 0,
      height: 0,
      color: currEntity.color,
    };

    this.setState({
      isDrawing: true,
      shape: newShape,
    });
  };

  saveLabeledShape = () => {
    const { shape } = this.state;
    const { currEntity } = this.props;
    const labeledShape = {
      label: currEntity.label,
      color: currEntity.color,
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    };
    this.props.addShape(labeledShape);
  };

  handleMouseMove = (e) => {
    const { isDrawing, shape } = this.state;
    const { currEntity } = this.props;

    if (currEntity.index === -1) return;

    const mouseX = e.evt.layerX;
    const mouseY = e.evt.layerY;

    if (isDrawing) {
      const newWidth = mouseX - shape.x;
      const newHeight = mouseY - shape.y;

      const newShape = {
        x: shape.x, // keep starting position the same
        y: shape.y,
        width: newWidth, // new width and height
        height: newHeight,
        color: shape.color,
      };

      this.setState({
        shape: newShape,
      });
    }
  };

  handleInnerClick = (e) => {
    // e.cancelBubble = true;
    // console.log(e);
  };

  render() {
    const { shape, width, height } = this.state;
    const { shapes } = this.props;
    let currentShape = null;
    if (shape !== null) {
      currentShape = (
        <ColoredRect
          key={`${shape.color}${shape.x}${shape.y}`}
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          color={shape.color}
          onClick={this.handleInnerClick}
        />
      );
    }
    return (
      <div>
        <Stage
          className="drawingField"
          width={width}
          height={height}
          onClick={this.handleClick}
          onContentMouseMove={this.handleMouseMove}
        >
          <Layer
            ref={(ref) => {
              this.layer = ref;
            }}
          >
            {shapes.map(obj => (
              <ColoredRect
                key={`${obj.color}${obj.x}${obj.y}`}
                x={obj.x}
                y={obj.y}
                width={obj.width}
                height={obj.height}
                color={obj.color}
                onClick={this.handleInnerClick}
              />
            ))}
            {currentShape}
          </Layer>
        </Stage>
      </div>
    );
  }
}

DrawingField.propTypes = {
  shapes: PropTypes.array.isRequired,
  currEntity: PropTypes.shape({
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  currEntity: state.entities.currEntity,
  shapes: state.shapes.labeledShapes,
});

export default connect(
  mapStateToProps,
  { addShape },
)(DrawingField);
